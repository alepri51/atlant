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

return new token & auth every time

*/
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

        this.payload = this.token && this.verifyJWT(this.token);
        this.error = void 0;

        let self = this;

        const handler = {
            get(target, propKey, receiver) {
                const origMethod = target[propKey];
                if(typeof origMethod === 'function') {
                    let method = self.security(propKey, origMethod);
                    
                    return function (...args) {
                        console.log('CALLED:', self.constructor.name, propKey);
                        const result = method.apply(this, args);
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

    security(name, method) {
        return method;
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

        this.signJWT(member, payload);

        //await db.insert('token', payload);
        return this.token;
    }

    signJWT(member, payload) {
        this.token = jwt.sign(payload, member.privateKey, {algorithm: 'RS256', expiresIn: '10s'});
    }

    verifyJWT(token) {
        let payload = jwt.decode(token);

        try {
            jwt.verify(token, payload.key);
            this.member = payload.member;
        }
        catch(err) {
            this.revokeJWT(payload.jwtid);
            this.error = new APIError(403, err.message);
            return;
        };

        return payload;
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
        let self = this;
        if(!this.auth) {
            return function() { 
                this.error = new APIError(403, `${self.constructor.name} AUTHENTICATION REQUIRED`);
                return;
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

    default() {
        //console.log(this.payload.member);
        return { balance: {btc: .00001, bonus: 10} };
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

        if(auth) {
            await this.generateJWT({ member });

            let account = new Account(this.token);
            let balance = account.default();
            

            //return auth ? {auth: { name: member.name, email }, balance} : { error: 'Пользователь не найден' };
            return { balance };
        }
        
        this.error = new APIError(404, 'Пользователь не найден');
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
            

            await this.generateJWT({ member });
    
            //return { auth: { name, email } };
            return;
        }

        //this.revokeJWT(this.payload.jwtid);
        this.error = new APIError(404, 'Не корректный адрес почтового ящика или пользователь уже зарегистрирован.');
        //return { error: 'Не корректный адрес почтового ящика или пользователь уже зарегистрирован.', auth: this.payload && this.payload.auth };
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
