'use strict';

const normalizer = require('normalizr');

let normalize = function normalize(data = {}) {
    if(Object.keys(data).length) {
        data.api = data.api || 'v1';
        const schema = normalizer.schema;

        const _count = new schema.Entity('count', {}, { idAttribute: 'count' });

        const _wallet = new schema.Entity('wallet', {}, { idAttribute: '_id' });

        const _member = new schema.Entity('member', {}, { idAttribute: '_id' });
        _member.define({
            referer: _member,
            referals: [_member],
            list: {
                members: [_member]
            },
            wallet: _wallet
        });
        
        const _default = new schema.Entity('default', {}, { idAttribute: '_name' });
        
        const _order = new schema.Entity('payment', {}, { idAttribute: 'id' });

        const _news = new schema.Entity('news', {
            author: _member
        }, { idAttribute: '_id' });

        const _singlenews = new schema.Entity('singlenews', {
            author: _member
        }, { idAttribute: '_id' });

        const _content = new schema.Entity('content', {}, { idAttribute: '_id' });
        _content.define({
            parent: _content,
            children: [_content]
        });

        const _manual = new schema.Entity('manual', {
            author: _member,
            parent: _content
        }, { idAttribute: '_id' });

        const db = new schema.Entity('database', {
            member: _member,
            news: [_news],
            singlenews: [_singlenews],
            defaults: [_default],
            content: [_content],
            manual: [_manual],
            orders: [_order],
            count: _count
        }, { 
            idAttribute: 'api'
        });

        let normalized = normalizer.normalize(data, db);
        delete normalized.entities.wallet;
        normalized = { ...normalized, entry: 'database' };

        return normalized;
    }
    else return data;
}

module.exports = {
    normalize
}
 