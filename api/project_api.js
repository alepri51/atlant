'use strict';

const { normalize } = require('../models');
const { Model, DBAccess } = require('./db_api');
const { API, SecuredAPI } = require('./base_api');
const db = require('../models');

const Order = require('./order');

function s2p(obj, path){
    var parts = path.split('.');
    var curr = obj;
    
    for(let i = 0; i < parts.length - 1; i++)
        curr = curr[parts[i]] || {};
    
    return curr[parts[parts.length-1]];
}

class Donate extends SecuredAPI {
    constructor(...args) {
        super(...args);

        this.error = void 0;
    }

    async save(payload, req, res) {
        console.log(payload);
        let order = fake_orders[payload._id];
        order.state = 'waiting';

        let orders = Object.values(fake_orders);

        let result = {
            orders
        };

        result = normalize(result);
        this.io.emit(`${this.auth.member}:update:paymentlayout`, result);

        setTimeout(() => {
            order.state = 'completed';

            let orders = Object.values(fake_orders);
    
            let result = {
                orders
            };

            result = normalize(result);
            this.io.emit(`${this.auth.member}:update:paymentlayout`, result);

        }, 4000);

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
            
            let params = donate.price.destinations.reduce((memo, destination, inx) => {
                memo.charges = memo.charges || {};
                memo.destinations = memo.destinations || [];

                memo.charges[inx] = destination.sum;
                
                let address = destination.to;

                if(address.indexOf('.') !== -1) {
                    let member = destination.to.split('.')[0];
                    destination.to = destination.to.split('.').slice(1);
                    address = s2p(roots[member], destination.to.join('.'));
                }

                memo.destinations.push({
                    line: inx,
                    address
                });

                return memo;
            }, {});

            params.cost = donate.price.amount;
            let convert = await db.btc.convertToBtc(donate.price.amount);
            params.rate = convert.rate.last;
            params.address = member.wallet.club_address;

            let order = new Order({ ...params });
            order = order.get();

            order._id = db.generate('1234567890abcdef', 32);
            order.state = 'unconfirmed';

            let { price, ...rest_donate } = donate;
            order.product = rest_donate;
            order.date = Date.now();

            let { destinations, ...rest_order } = order;

            fake_orders[order._id] = rest_order;

            let result = {
                donate: rest_order
            };

            //result = normalize(result);

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

    normalize(data) {
        data = super.normalize(data);
        data._replace = true;

        return data;
    }

    async default(params) {
        console.log(params);

        let page = params.page - 1 || 0;
        
        let orders = Object.values(fake_orders).slice(page * 8, (page + 1) * 8);

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