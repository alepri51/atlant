'use strict';

const { normalize } = require('../models');
const { Model, DBAccess } = require('./db_api');
const { API, SecuredAPI } = require('./base_api');
const db = require('../models');

class Structure extends DBAccess {
    constructor(...args) {
        super(...args);

        this.transforms.push('expand');
    }

    async default() {
        return await this.expand();
        /* let member = await db.Member._findOne({ _id: this.auth.member });

        let result = {
            member
        };

        //result = normalize(result);

        return result; */
    }

    async expand() {
        let member = await db.Member._findOne({ _id: parseInt(this.id) || this.auth.member });

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
        let manual = await db.Manual._query('MATCH (node: `Статья` {_id:{id}})-[*]->(r: `Раздел`) WITH node, collect(r._id) AS parents', { id: parseInt(this.id) }, { otherVars: ['parents']});

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

module.exports = { NewsLayout, News, SingleNews, Content, Manual, SingleManual, Structure };