'use strict';

const { normalize } = require('./models/normalize');
const { Model, DBAccess } = require('./db_api');
const { API, SecuredAPI } = require('./base_api');
const db = require('./models');

const axios = require('axios');

const Order = require('./order');

function s2p(obj, path){
    var parts = path.split('.');
    var curr = obj;
    
    for(let i = 0; i < parts.length - 1; i++)
        curr = curr[parts[i]] || {};
    
    return curr[parts[parts.length-1]];
}

class Balance extends SecuredAPI {
    constructor(...args) {
        super(...args);

        this.error = void 0;

    }

    async default() {
        console.log(payload);

        let response = await axios({
            method: 'DELETE',
            url: `http://atlantwork.com/btcapi/orders/${payload.id}`
        })
        .catch((err) => {
            this.error = {
                code: err.code || 400,
                message: err.message
                
            };
        });

        if(this.error) return;

        console.log(response.data);
    }
}

class Donate extends SecuredAPI {
    constructor(...args) {
        super(...args);

        this.error = void 0;

        /* this.emitter.on('interval', () => { // OFF EVENT AFTER CLASS METHOD CALL
            console.log('interval from emitter');
        }); */
    }

    checkDonate(self) {

    }

    async cancel(payload, req, res) {
        console.log(payload);

        let response = await axios({
            method: 'DELETE',
            url: `http://atlantwork.com/btcapi/orders/${payload.id}`
        })
        .catch((err) => {
            this.error = {
                code: err.code || 400,
                message: err.message
                
            };
        });

        if(this.error) return;

        console.log(response.data);
        //return response.data;
    }

    async save(params, req, res) {
        console.log(params);

        let response = await axios({
            method: 'GET',
            //url: `http://atlantwork.com/btcapi/orders/?id=${payload.id}`
            url: `http://atlantwork.com/btcapi/orders/?memberId=${this.auth.member}&limit=${params.size || 5}&offset=${(params.paymentPage - 1 || 0) * (params.size || 5)}&order[]=[["id","ASC"]]`
        })
        .catch((err) => {
            this.error = {
                code: err.code || 400,
                message: err.message
                
            };
        });

        let orders = response.data.orders;
        orders.push({
            id: 0,
            count: Math.ceil(response.data.count / 5)
        });

        let result = {
            orders
        };

        result = normalize(result);

        //this.io.emit(`${this.auth.member}:update:paymentlayout`, result);

        this.emitter.cycle({ event: 'check-order', interval: 1000, immediate: false });

        let cnt = 5;
        this.emitter.on('check-order', (socket) => {
            cnt--;
            !cnt && this.emitter.stop('check-order');
            console.log('check-order', cnt);
        });

        return result;
    }

    async prepare() {
        let member = await db.Member._findOne({ _id: this.auth.member });

        if(member.referer) {
            let referer = await db.Member._findOne({ _id: member.referer._id });
            referer.list = await db.List._findOne({ _id: referer.list._id });

            let club = await db.Club._findAll();
            club = club.pop();
            
            let roots = {
                referer,
                club
            }

            let donate = await db.Product._findOne({ name: 'взнос' });
            
            let params = donate.price.destinations.reduce(async (memo, destination) => { //change inx to destination line!!! 0- line is club address ever
                memo = await memo;

                memo.charges = memo.charges || {};
                memo.destinations = memo.destinations || [];

                memo.charges[destination.line] = destination.sum;
                
                let root = destination.to.split('.')[0];
                let mid = destination.to.split('.')[1];
                let address = void 0;

                if(root !== 'member') {
                    if(roots[root]) {
                        destination.to = destination.to.split('.').slice(1);
                        mid = s2p(roots[root], destination.to.join('.'));
                        mid = mid || roots[root];
                        address = mid.wallet.address;
                        mid = mid._id;
                    } else throw new Error('Unknown product destination!');
                }
                else {
                    mid = await db.Member._findOne({ _id: mid }); //NOT TESTED YET
                    address = mid.wallet.address;
                    mid = mid._id;
                }

                memo.destinations.push({
                    line: destination.line,
                    mid,
                    address
                });

                memo.cost = memo.cost + destination.sum || destination.sum;

                return memo;
            }, {});

            params = await params;

            params.address = member.wallet.club_address;
            params.memberAddress = member.wallet.address;
            params.memberId = member._id;
            params.type = donate.name;
            params.typeId = donate._id;

            let response = await axios({
                method: 'POST',
                url: 'http://atlantwork.com/btcapi/newOrder',
                data: { ...params }
            })
            .catch((err) => {
                this.error = {
                    code: err.code || 400,
                    message: err.message
                    //message: (err.config && err.config.data) || err.message
                };
            });

            /* let response = await axios({
                method: 'GET',
                url: `http://atlantwork.com/btcapi/orders/?id=${32}`,
            })
            .catch((err) => {
                this.error = {
                    code: err.code || 400,
                    message: err.message
                    
                };
            }); */

            if(this.error) return;

            let order = response.data.order || response.data;

            console.log(order);

            let { id, amount, cost, rate, address } = order;

            let result = { donate: { id, amount, cost, rate, address } };

            

            return result;
        }
        else {
            this.error = {
                code: 400,
                message: 'Вы не можете сделать клубный взнос.'
            }
        }
    }
}

let fake_orders = {};

class Payment extends DBAccess {
    constructor(...args) {
        super(...args);

        this.transforms.push('expand');
    }

    onNormalized(name, data) {
        data._replace = true;
        data.entities.payment = data.entities.payment || {};
        
        return data;
    }

    async default(params) {
        console.log(params);

        let response = await axios({
            method: 'GET',
            url: `http://atlantwork.com/btcapi/orders/?memberId=${this.auth.member}&limit=${params.size || 5}&offset=${(params.page - 1 || 0) * (params.size || 5)}&order[]=[["id","ASC"]]`
        })
        .catch((err) => {
            this.error = {
                code: err.code || 400,
                message: err.message
                
            };
        });

        this.error = void 0;
        let orders = !this.error ? response.data.orders : [];
        orders.push({
            id: 0,
            count: Math.ceil(response.data.count / 5)
        });

        let result = {
            orders
        };

        //result = normalize(result);

        return result;
    }
}

class Structure extends DBAccess {
    constructor(...args) {
        super(...args);

        this.transforms.push('expand');
    }

    async default() {
        return await this.expand();
    }

    async expand() {
        let member = await db.Member._findOne({ _id: parseInt(this.id) || this.auth.member });
        let list = await db.List._findOne({ _id: member.list._id });
        member.list.members = list.members.sort((a, b) => a._rel.номер - b._rel.номер);

        let result = {
            member
        };

        //result = normalize(result);

        return result;
    }
}

class Content extends DBAccess {
    constructor(...args) {
        super(...args);

    }

    async default() {
        let sections = await db.Section._findAll();

        //let roots = sections.filter(section => !section.parent);
        let content = sections.map((section, inx, arr) => {
            let children = arr.filter(item => item.parent && item.parent._id === section._id);
            children.length && (section.children = children);
            //section.children = section.children || [];
            return section;
        });

        let result = {
            content
        };

        //result = normalize(result);

        return result;
    }
    
}

class SingleManual extends SecuredAPI {
    constructor(...args) {
        super(...args);

        this.error = void 0;//СОМНИТЕЛЬНАЯ ХУЙНЯ
    }

    async default() {
        //let news = await db.News._query('MATCH (node:Новость {_id:{id}})', { id: parseInt(this.id) });
        //let news = await db.News._findOne({ _id: parseInt(this.id) }, { compositions: [] });
        //let manual = await db.Manual._findOne({ _id: parseInt(this.id) });
        //news = news.sort((a, b) => b.updated - a.updated);
        let manual = await db.Manual._query('MATCH (node: `Статья` {_id:{id}})-[:`раздел`*]->(r: `Раздел`) WITH node, collect(r._id) AS parents', { id: parseInt(this.id) }, { otherVars: ['parents']});

        let result = {
            manual
        };

        result = normalize(result);

        return result;
    }
}

class Manual extends DBAccess {
    constructor(...args) {
        super(...args);
    }

    async default() {
        let manual = await db.Manual._query('MATCH (node: `Статья`)-[*]->(r: `Раздел`) WITH node, collect(r._id) AS parents', {}, { otherVars: ['parents']});
        //let manual = await db.Article._findAll();
        //news = news.sort((a, b) => b.updated - a.updated);

        let result = {
            manual,
            defaults: [
                {
                    _name: 'manual',
                    title: `Статья - ${new Date().toLocaleString()}`,
                    text: 'Текст',
                    tags: ['Новость']
                }
            ]
        };

        return result;
    }

    checkSecurity(name, method) {
        let accessDeniedError = function(...args) {
            this.generateError({ code: 400, message: 'Вам отказано в доступе. Возможно Ваша учетная запись не обладает достаточным уровнем привелегий для выполнения запрошенной операции', data: { class: this.constructor.name }});
        };

        method = super.checkSecurity(name, method);

        if(name === 'save') {
            method = method || (this.auth.group !== 'admins' && accessDeniedError);
        }

        return method;
    }

    accessGranted(payload) {
        return true;
        return (payload._id && parseInt(payload.author) === this.auth.member) || !!!payload._id;
    }

    async beforeInsert(payload, req) {
        payload.author = { _id: this.auth.member };
        payload.parent = { _id: payload.parent };
        return payload;
    }

    async beforeUpdate(payload, req) {
        payload.author = { _id: this.auth.member };
        payload.parent = { _id: payload.parent };
        return payload;
    }

    async transformData(data, req) {
        let manual = await db.Manual._query('MATCH (node: `Статья` {_id:{id}})-[*]->(r: `Раздел`) WITH node, collect(r._id) AS parents', { id: data._id }, { otherVars: ['parents']});
        manual.length === 0 && (manual = [data]);
        
        return {
            manual
        };
    }
}

class NewsLayout extends Model {
    constructor(...args) {
        super(...args);
    }

    default() {
    }
}

class SingleNews extends API {
    constructor(...args) {
        super(...args);

        this.error = void 0;//СОМНИТЕЛЬНАЯ ХУЙНЯ
    }

    async default() {
        //let news = await db.News._query('MATCH (node:Новость {_id:{id}})', { id: parseInt(this.id) });
        //let news = await db.News._findOne({ _id: parseInt(this.id) }, { compositions: [] });
        let news = await db.News._findOne({ _id: parseInt(this.id) });
        //news = news.sort((a, b) => b.updated - a.updated);

        let result = {
            news: [news]
        };

        result = normalize(result);

        return result;
    }
}

class News extends DBAccess {
    constructor(...args) {
        super(...args);
    }

    async default() {
        //let news = await db.News._query('MATCH (node:Новость)', { });
        let news = await db.News._findAll();
        //news = news.sort((a, b) => b.updated - a.updated);

        let result = {
            news,
            defaults: [
                {
                    _name: 'news',
                    title: `Заголовок - ${new Date().toLocaleString()}`,
                    text: 'Текст',
                    tags: ['Новость']
                }
            ]
        };

        return result;
    }

    checkSecurity(name, method) {
        let accessDeniedError = function(...args) {
            this.generateError({ code: 400, message: 'Вам отказано в доступе. Возможно Ваша учетная запись не обладает достаточным уровнем привелегий для выполнения запрошенной операции', data: { class: this.constructor.name }});
        };

        method = super.checkSecurity(name, method);

        if(name === 'save') {
            method = method || (this.auth.group !== 'admins' && accessDeniedError);
        }

        return method;
    }

    accessGranted(payload) {
        //return true;
        return (payload._id && parseInt(payload.author) === this.auth.member) || !!!payload._id;
    }

    async beforeInsert(payload, req) {
        payload.author = { _id: this.auth.member };
        payload.date = Date.now();
        return payload;
    }

    async beforeUpdate(payload, req) {
        payload.author = { _id: payload.author };
        return payload;
    }

    async transformData(data, req) {
        return {
            news: [data]
        };
    }
}

module.exports = { NewsLayout, News, SingleNews, Content, Manual, SingleManual, Structure, Payment, Donate };