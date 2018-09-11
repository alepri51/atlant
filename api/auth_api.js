'use strict';

const crypto = require('crypto2');
const bcrypt = require('bcryptjs');
const generate = require('nanoid/generate');
const uaParser = require('ua-parser-js');

const { API } = require('./base_api');
const db = require('../models');
let { btc, Club, Member, List, Message } = db;

class SignIn extends API {
    constructor(...args) {
        super(...args);

        this.error = void 0;
    }

    async submit({ email, password }) {
        //await User.deleteMany();
        let member = await Member._findOne({ email }, { compositions: ['wallet'] });
        let auth = member && await bcrypt.compare(`${email}:${password}`, member.hash);

        if(auth) {
            let payload = {
                id: member._id,
                auth: {
                    member: member._id,
                    email: member.email,
                    name: member.name,
                    ref: member.ref,
                    group: member.group,
                    signed: 1
                },
                key: member.wallet.publicKey
            };

            this.token = this.signJWT(payload, member.wallet.privateKey);
        }
        else this.error = {
            code: 404,
            message: 'Пользователь не найден'
        }




        /* let users = await User.find();

        let current_user = await User.findOne({ _id: this.payload.id });
        let user = await User.findOne({ 'account.email': email });

        let auth = user && user.account && await bcrypt.compare(`${email}:${password}`, user.account.hash);

        if(auth) {
            !current_user.account && current_user.id !== user.id && await current_user.remove();

            this.payload = user.projection();
            this.payload.key = user.account.public_key;

            this.payload.auth = {
                id: user.id,
                email: user.account.email,
                name: user.name,
                signed: 1
            };
        }
        else {
            this.error = {
                code: 404,
                message: 'Пользователь не найден'
            }
        } */
    }
}

class SignOut extends API {
    constructor(...args) {
        super(...args);

        this.error = void 0;
    }

    async submit() {
        this.payload.auth = {
            id: this.payload.auth.id,
            signed: 0
        };
    }
}

class SignUp extends API {
    constructor(...args) {
        super(...args);

        this.error = void 0;
    }

    async submit(params, req) {
        let { name, email, password, referer, wallet_address } = params;

        let member = await Member._findOne({ email });

        if(!member) {
            referer = await Member._findOne({ ref: referer });
            
            let root = referer || await Member._query('MATCH (node:Участник)-[pos:позиция {номер: {n}}]-(:`Корневой список`)', { n: 7 });
            Array.isArray(root) && (root = root[0]);

            if(referer) {
                let list = await List._findOne({ _id: referer.list._id });
                referer.list.members = list.members;

                let members = referer.list.members.sort((a, b) => a._rel.номер - b._rel.номер);
                members = members.slice(1); 

                let { privateKey, publicKey } = await crypto.createKeyPair();

                member = await Member._save({ 
                    name, 
                    email, 
                    hash: this.hash(`${email}:${password}`),
                    referer,
                    ref: generate('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
                    wallet: {
                            publicKey,
                            privateKey,
                            club_address: await btc.getNewAddress(),
                            wallet_address
                    }
                });

                members.push(member);
                members = members.map((member, inx) => {
                    member._rel = { номер: inx + 1 };
                    return member;
                });

                list = await List._save({ members });

                member.list = list;
                await Member._update(member);

                let club = await Club._findAll();
                club = club.pop();

                let message = {
                    caption: `${member.name}, приветствуем в нашем клубе!`,
                    text: 'Добро пожаловать!',
                    date: Date.now(),
                    from: club,
                    to: member
                };

                await Message._save(message);

                referer.referals = referer.referals || [];
                referer.referals.push(member);

                await Member._update(referer);

                               
                let payload = {
                    id: member._id,
                    auth: {
                        member: member._id,
                        email: member.email,
                        name: member.name,
                        ref: member.ref,
                        group: member.group,
                        signed: 1
                    },
                    key: member.wallet.publicKey
                };
    
                this.token = this.signJWT(payload, member.wallet.privateKey);
            }
            else this.error = {
                code: 400,
                message: 'Не корректный номер реферера, проверьте номер и попробуйте еще раз. [' + root.ref + ']'
            }
        }
        else this.error = {
            code: 400,
            message: 'Данное имя уже используется. Попробуйте восстановить пароль.'
        }
    }

    async silent(params, req, res) {
        //ПРИДУМАТЬ МЕХАНИЗМ ПО УДАЛЕНИЮ УСТАРЕВШИХ ПОЛЬЗОВАТЕЛЕЙ
        //let users = await User.find();

        let ua = uaParser(req.headers['user-agent']);

        let user = {
            id: generate('abcdefghijklmnopqrstuvwxyz', 10),
            name: req.ip + ':' + req.headers['user-agent']
        };

        let payload = this.payload;

        payload = user;
        payload.insecure = true;
        payload.key = generate('abcdefghijklmnopqrstuvwxyz', 10);

        payload.auth = {
            id: user.id,
            signed: 0
        };


        this.token = this.signJWT(payload, payload.key, {});

        //console.log(params);
    }
}

module.exports = { SignIn, SignOut, SignUp };