'use strict'

const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto2');

/*
1. token !== null
verify & decode
cache private key in REDIS (now just plain json)
check expiration & refresh if needed
2. token === null

return new token & auth & error every time

*/
let KEYS_CACHE = {};

class APIError extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }
}

class API {
    constructor(token, id) {
        this.token = token;
        this.id = id;
        this.member = void 0;
        this.error = void 0;

        this.payload = this.token && this.verifyJWT(this.token);
        this.member = this.payload && this.payload.member;

        let self = this;

        const handler = {
            get(target, propKey, receiver) {
                const origMethod = target[propKey];
                if(typeof origMethod === 'function') {
                    let method = self.security(propKey, origMethod);
                    
                    return function (...args) {
                        console.log('CALLED:', self.constructor.name, propKey);
                        const result = method.apply(self, args);
                        return result;
                    };
                }
                else return origMethod;
            }
        };
        return new Proxy(this, handler);
    }

    get auth() {
        return this.payload && this.payload.auth;
    }

    get class_name() {
        return this.constructor.name;
    }

    security(name, method) {
        return method;
    }

    generateError(code, message, data) {
        let error = this.error;
        //data = data || this.error.data;
        this.error = new APIError(code, message);
        this.error.class = this.class_name;
        this.error.data = data;
        this.error.history = this.error.history || [];
        error && this.error.history.push(error);
    }

    hash(value) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
    }

    async generateJWT({ member }) {
        let salt = bcrypt.genSaltSync(10);
        let jwtid = await crypto.createPassword(salt, 32);

        let payload = {
            jwtid,
            member: member._id,
            auth: {
                email: member.email,
                name: member.name
            },
            key: member.publicKey
        };

        this.signJWT(member.privateKey, payload);

        //await db.insert('token', payload);
        return this.token;
    }

    signJWT(private_key, payload) {
        delete payload.iat;
        delete payload.exp;

        this.token = jwt.sign(payload, private_key, {algorithm: 'RS256', expiresIn: '10s'});
    }

    verifyJWT(token) {
        let payload = jwt.decode(token);

        try {
            jwt.verify(token, payload.key);
            this.member = payload.member;

            let private_key = KEYS_CACHE[this.member];

            !private_key && setImmediate( async () => {
                let member = await db.findOne('member', { _id: payload.member });
                KEYS_CACHE[this.member] = member.privateKey;
            });

            private_key && this.signJWT(private_key, payload);

            return payload;
        }
        catch(err) {
            this.revokeJWT(payload.jwtid);
            this.generateError(403, err.message, err.expiredAt);
        };

    }

    async revokeJWT(id) {
        this.token = void 0;
        this.payload = void 0;
    }

    default() {
        return {}
    }
};

class SecuredAPI extends API {
    constructor(...args) {
        super(...args);

    }

    security(name, method) {
        let exceptions = ['generateError'];
        let except = exceptions.includes(name); //AVOID STACK OVERFLOW DUE RECURSION

        let self = this;
        if(!except && !this.auth) {
            return function(...args) { 
                self.generateError(403, `${self.constructor.name} AUTHENTICATION REQUIRED`);
            };
        }

        return method;
    }
}



class Auth extends API {
    constructor(...args) {
        super(...args);
    }

    default() {
        //return this.payload && (this.payload.auth ? {auth: this.payload.auth, error: this.payload.error} : {auth: void 0, error: this.payload.error}) || {};
        return {};
    }
}

class Account extends SecuredAPI {
    constructor(...args) {
        super(...args);
        //use proxy to handle not auth
    }

    async default() {
        //console.log(this.payload.member);
        let txs = await db.find('transaction', { to: this.member });
        let sum = txs.reduce((sum, tx) => {
            sum[tx.currency] = sum[tx.currency] || 0;
            sum[tx.currency] += tx.amount;

            return sum;
        }, {});

        return { balance:  { ...sum } };
    }
}

class Signin extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({email, password}) {
        //console.log(email, password);
        
        let member = await db.findOne('member', {email});
        let auth = member && await bcrypt.compare(`${email}:${password}`, member.hash);

        auth && await this.generateJWT({ member });

        !auth && this.generateError(404, 'Пользователь не найден');
    }
}

class Signout extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({email, password}) {
        this.payload && await this.revokeJWT(this.payload.jwtid);

        return {auth: void 0};
    }
}

class Signup extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({name, email, password, referer}) {
        let member = await db.findOne('member', { email });

        if(!member) {
            let default_list = await db.findOne('list', { default: true });
            
            if(!default_list) {
                let roots = await db.find('member', { group: "root" });
                roots = roots.map((member, inx) => { 
                    member.position = inx;
                    return member._id;
                });
                default_list = await db.insert('list', { default: true, members: roots});
            }
    
            referer = referer || default_list.members.slice(-1)[0];

            let hash = this.hash(`${email}:${password}`);
            let {privateKey, publicKey} = await crypto.createKeyPair();

            let member = await db.insert('member', { group: "member", referer, name, email, hash, publicKey, privateKey });
            
            await db.insert('transaction', { from: member._id, to: referer, currency: 'btc', amount: 0.01, date: new Date() });
            await db.insert('transaction', { from: member._id, to: referer, currency: 'bnc', amount: 1, date: new Date() });
            await db.insert('transaction', { from: member._id, to: referer, currency: 'usd', amount: 5, date: new Date() });

            await this.generateJWT({ member });
        }
        else this.generateError(404, 'Не корректный адрес почтового ящика или пользователь уже зарегистрирован.');
    }
}

let classes = {
    API,
    Signin,
    Signup,
    Signout,
    Auth,
    Account
}

module.exports = Object.entries(classes).reduce((memo, item) => {
    memo[item[0].toLowerCase()] = item[1];
    return memo;
}, {});
