'use strict'

const crypto = require('crypto2');
const generate = require('nanoid/generate');

/* const mongoose = require('mongoose');
const { Schema, Model } = mongoose;

const mongo_port = 32771;
//const mongo_port = 32774;

mongoose.connect(`mongodb://localhost:${mongo_port}/myapp`, {
    useNewUrlParser: true
}); */

const BTC = require('../btc');
const btc = new BTC({env: 'dev'});

//const bolt_port = 32768;
const bolt_port = 7687;
//http://206.81.24.70:7474
const neo = require('seraph')({
    bolt: true,
    server: `bolt://10.135.47.222:${bolt_port}`,
    //server: `bolt://206.81.24.70:${bolt_port}`,
    user: 'neo4j',
    pass: '123',
    id: '_id'
});

const neoModel = require('./seraph-model');

//////////////////////////MODELS//////////////////////////////////////

let member = {
    name: String,
    email: String,
    hash: String,
    ref: String,
    group: String
};

let wallet = {
    club_address: String,
    address: String,
    privateKey: String,
    publicKey: String
};

let Wallet = neoModel(neo, 'Кошелек', wallet);

let Member = neoModel(neo, 'Участник', member);
let RootMember = neoModel(neo, ['Участник', 'Основатель'], member);
let Club = neoModel(neo, ['Участник', 'Клуб'], member);

let RootList = neoModel(neo, ['Список', 'Корневой список']);
RootList.compose(RootMember, 'members', 'позиция', { orderBy: 'email', many: true });

let List = neoModel(neo, 'Список');
List.compose(Member, 'members', 'позиция', { orderBy: 'email', many: true });

Club.compose(Wallet, 'wallet', 'имеет');

RootMember.compose(RootList, 'list', 'список');
RootMember.compose(Wallet, 'wallet', 'имеет');
RootMember.compose(Member, 'referals', 'реферал', { many: true });

Member.compose(List, 'list', 'список');
Member.compose(Wallet, 'wallet', 'имеет');
Member.compose(Member, 'referer', 'реферер');
Member.compose(Member, 'referals', 'реферал', { many: true });

let product = {
    name: String,
    icon: String,
    color: String,
    maxQty: Number,
    group: String,
    minPeriod: String
};

let price = {
    //'product': Link,
    amount: Number
};

let destination = {
    to: String,
    sum: Number,
    percent: Number,
    line: Number
};

let Product = neoModel(neo, 'Продукт', product);
let Price = neoModel(neo, 'Цена', price);
let Destination = neoModel(neo, 'Распределение', destination);

Product.compose(Price, 'price', 'ценообразование');
Price.compose(Destination, 'destinations', 'распределение');

let info = {
    title: String,
    text: String
};

let Info = neoModel(neo, 'Информация', info);

let news = {
    picture: String,
    compressed: String,
    video_url: String,
    video_provider: String,
    video_id: String,
    tags: Array,
    ...info
};

let News = neoModel(neo, ['Информация', 'Новость'], news);
News.compose(Member, 'author', 'автор');

let event = {
    date: Date,
    ...info
};

let Event = neoModel(neo, ['Информация', 'Событие'], event);

let Message = neoModel(neo, ['Информация', 'Сообщение'], info);
Message.compose(Member, 'from', 'от');
Message.compose(Member, 'to', 'кому');

let orderItem = {
};

let OrderItem = neoModel(neo, 'Элемент', orderItem);

let order = {
    state: String,
    name: String,
    group: String,
    number: String,
    date: Date
};

let Order = neoModel(neo, ['Документ', 'Заказ'], order);
Order.compose(OrderItem, 'items', 'состоит', { many: true });
Order.compose(Member, 'member', 'участник');

OrderItem.compose(Order, 'order', 'принадлежит');
OrderItem.compose(Product, 'product', 'продукт');

let section = {
    title: String
};

let Section = neoModel(neo, ['Содержание', 'Раздел'], section);
Section.compose(Section, 'parent', 'раздел');

let Manual = neoModel(neo, ['Информация', 'Статья'], news);
Manual.compose(Member, 'author', 'автор');
Manual.compose(Section, 'parent', 'раздел');

//////////////////////////MODELS//////////////////////////////////////


//////////////////////////MODELS//////////////////////////////////////

async function getAccountPrivateKey(id) {
    let member = await Member._findOne({ _id: id });
    return member && member.wallet.privateKey;
}

async function getAccountKeys(id) {
    let member = await Member._findOne({ _id: id });
    return member && {
        privateKey: member.wallet.privateKey,
        publicKey: member.wallet.publicKey,
    }
}

const bcrypt = require('bcryptjs');

function hash(value) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
}

//////////////////////////MODELS//////////////////////////////////////

(async () => { //DB INIT IF NEEDED
    let sections = await Section._findAll();
        if(!sections.length) {
            let section = await Section._save({
                title: 'Инструкции'
            });

            await Manual._save({
                title: 'С чего начать',
                tags: ['инструкция'],
                parent: section
            });

            await Manual._save({
                title: 'Что делать дальше',
                tags: ['инструкция'],
                parent: section
            });

            section = await Section._save({
                title: 'Осознанность'
            });

            let s1 = await Section._save({
                title: 'Предназначение',
                parent: section
            });

            await Manual._save({
                title: 'Статья 1',
                tags: ['статья'],
                parent: s1
            });

            let s2 = await Section._save({
                title: 'Уверенность в себе',
                parent: section
            });

            await Manual._save({
                title: 'Статья 2',
                tags: ['статья'],
                parent: s2
            });

            section = await Section._save({
                title: 'Отношения между людьми'
            });

            let s3 = await Section._save({
                title: 'Этикет',
                parent: section
            });

            await Manual._save({
                title: 'Статья 3',
                tags: ['статья'],
                parent: s3
            });

        }
        sections = await Section._findAll();

        let prices = await Price._findAll();
        
        let destinations = await Destination._findAll();
        if(!!!prices.length) {
            /* let rc = 1;
            while(rc < 7) {

                await Destination._save({ 
                    to: 'referer.list.members.' + (rc - 1),
                    percent: 7,
                    sum: 5,
                    line: rc
                });
    
                rc++;
            } */
    
            await Destination._save({ 
                to: 'referer.list.members.0',
                percent: 20,
                sum: 15,
                line: 7
            });

            await Destination._save({ 
                to: 'referer.list.members.1',
                percent: 20,
                sum: 15,
                line: 6
            });

            await Destination._save({ 
                to: 'referer.list.members.2',
                percent: 20,
                sum: 15,
                line: 5
            });

            await Destination._save({ 
                to: 'referer.list.members.3',
                percent: 20,
                sum: 15,
                line: 4
            });

            await Destination._save({ 
                to: 'referer.list.members.4',
                percent: 20,
                sum: 15,
                line: 3
            });

            await Destination._save({ 
                to: 'referer.list.members.5',
                percent: 20,
                sum: 15,
                line: 2
            });

            await Destination._save({ 
                to: 'referer',
                percent: 15,
                sum: 10,
                line: 1
            });

            await Destination._save({ 
                to: 'club', // can be also member.{id} //lookup members with {id}
                percent: 30,
                sum: 25,
                line: 0
                //line: 0 //SET ALL LINES OR AS RELATION PROPERTY OR AS OBJECT {line} property
            });

            destinations = await Destination._findAll();
        }

        let price = !!!prices.length && await Price._save({ 
            amount: 75,
            destinations
        });

        let products = await Product._findAll();
        if(!products.length) {
            await Product._save({ 
                name: 'взнос',
                icon: 'fas fa-donate',
                color: 'red darken-2',
                maxQty: 1,
                group: 'donate',
                minPeriod: '1m',
                price
            });
        };



        let clubs = await Club._findAll();
        if(!!!clubs.length) {
            let club_address = generate('1234567890abcdef', 32);

            try {
                club_address = await btc.getNewAddress();
            }
            catch(err) {}

            let club = await Club._save({ 
                name: 'Club', 
                email: 'club@email.com', 
                hash: '',
                wallet: {
                        club_address,
                        address: club_address
                    }
            });
        }
    
        let roots = await RootMember._findAll();
        if(!!!roots.length) {
            let rc = 7;
            while(rc) {
                let {privateKey, publicKey} = await crypto.createKeyPair();

                let club_address = generate('1234567890abcdef', 32);

                try {
                    club_address = await btc.getNewAddress();
                }
                catch(err) {}

                await RootMember._save({ 
                    name: 'Участник ' + rc, 
                    email: rc + 'r@email.com', 
                    hash: hash(rc + 'r@email.com:123'),
                    ref: generate('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
                    wallet: {
                        publicKey,
                        privateKey,
                        club_address,
                        address: 'fake_address:' + generate('1234567890abcdef', 32)
                    },
                    group: 'admins'
                });
    
                rc--;
            }
    
            roots = await RootMember._findAll();
        }
    
        let lists = await RootList._findAll();
        if(!!!lists.length) {
            let list = {
                members: roots.sort((a, b) => a.email > b.email ? 1 : 0).map((member, inx) => {
                    member._rel = { номер: inx + 1 };
                    return member;
                })
            };
            
            list = await RootList._save(list);
    
            let last = list.members.pop();
            last.list = list;
            await RootMember._update(last);
        }
        console.log('done');
})();

module.exports = {
    getAccountPrivateKey,
    getAccountKeys,
    btc,
    generate,
    Wallet,
    Member,
    RootMember,
    Club,
    RootList,
    List,
    Product,
    Info,
    Message,
    News,
    Event,
    Order,
    OrderItem,
    Section,
    Manual
}
