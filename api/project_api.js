'use strict';

const { Model, DBAccess } = require('./db_api');
const db = require('../db');


class NewsLayout extends Model {
    constructor(...args) {
        super(...args);
    }

    default() {
    }
}

class News extends DBAccess {
    constructor(...args) {
        super(...args);
    }

    async default() {
        let news = await db.News._query('MATCH (node:Новость)', { });
        //let news = await db.News._findAll();
        //news = news.sort((a, b) => b.updated - a.updated);

        let result = {
            news
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

module.exports = { NewsLayout, News };