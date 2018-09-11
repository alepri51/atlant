'use strict'

const express = require('express');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

const types = require('./api');

let io = void 0;
let emitter = void 0;


/////////////////////////////////////////////////////////////////////////////////////////////
const fs = require('fs-extra');
const path = require('path');

const multer  = require('multer');

const storage = multer.memoryStorage();
const blobUpload = multer({ 
    storage,
    limits: {
        fileSize: 1024 * 6024
    }
});

let multipartDetector = function(req, res, next) {
    if(req.object.auth && req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
        
        let none = blobUpload.any();
        none(req, res, (err) => {
            req.blob = {
                err,
                files: req.files
            }

            next();
        });
    }
    else next();
};

/////////////////////////////////////////////////////////////////////////////////////////////

let patterns = ['/:type\::id\.:action', '/:type\.:action', '/:type\::id', '/:type'];

let processToken = async function(req, res, next) {
    let { type, id, action } = req.params;

    /* console.log('---------------BEGIN-----------------');
    console.log('REQUEST:', req.path);
    console.log('---------------BEGIN-----------------'); */

    type = type.toLowerCase();
    !types[type] && (type = 'unknown');

    req.params.type !== type && console.log('REQUEST CAST FROM :', req.params.type, 'TO:', type);

    let token = req.headers.authorization;
    
    if(!token) {
        let singup = new types['signup']({});
        await singup.silent({}, req, res);
        token = singup.token; 
    }

    let payload = await types[type].verifyJWT(token);

    let object = new types[type]({ token: req.headers.authorization, id, io, req, res, payload, emitter });
    req.object = object;

    next();
};

let proccedRequest = async function(req, res) {
    
    let { action } = req.params;

    let object = req.object;
    let result = {};

    if(!object.error) {
        !object[action] && (action = 'default');

        //let executor = action ? object[action].bind(object) : object.default.bind(object);
        //let executor = object[action].bind(object);

        let params = Object.keys(req.body).length === 0 ? req.query : req.body;
        result = await object[action].call(object, params, req, res); //executor(params, req, res);

        await object.refreshJWT(); //DO NOT REMOVE
    }

    let { token, auth, error } = object;

    /* console.log('----------------END------------------');
    console.log('RESPONSE:', req.path);
    console.log('RESULT:', result);
    console.log('----------------END------------------'); */

    return { token, auth, error, ...result };
};

router.all(patterns, processToken, /* multipartDetector, */ async (req, res, next) => {
    try {
        
        console.log('BEGIN REQUEST:', req.path);

        let response = await proccedRequest(req, res);

        //console.log(req.path, response);

        res.json(response).end();
        console.log('END REQUEST:', req.path);
    }
    catch(err) {
        let error = {
            code: err.code,
            message: err.message,
            system: true
        }
        console.log('ERROR => ', err);

        res.json({error}).end();
    }

    
}); 

let socketInitialize = function(sockets) {
    io = sockets;

    sockets.on('connection', (socket) => {
     
        socket.on('request', async (data, cb) => {
            let { type, id, action, authorization, body, method = 'GET' } = data;
            let req = {
                params: { type, id, action },
                headers: { authorization },
                body,
                method
            };

            let response = await proccedRequest(req);

            cb(response);
        });
      
    });
}

process.on('unhandledRejection', err => {
    console.log('unhandledRejection => ', err);
});

const EventEmitter = require('events');

class Emitter extends EventEmitter {
    constructor({ io, payload, interval }) {
        super();
        //internal server singlton  to create at start up
        this.io = io;
        this.payload = payload;

        this.timer = void 0;

        this.cycle(interval);

        this.functions = [
            {
                calls: Infinity,
                executor: this.onInterval
            }
        ];

        /* this.functions = [
            {
                calls: Infinity,
                executor: this.onInterval
            }, 
            this.test,
            {
                calls: 1,
                executor: this.test1
            }
        ]; */
    }

    push(action) {
        this.functions.push(action);
    }

    cycle(interval = 1000) {
        !this.timer && (this.timer = setTimeout(async () => {
            clearTimeout(this.timer);
            
            let actions = this.functions.reduce((memo, action) => {
                if(typeof action === 'object') {
                    let calls = action.calls;
                    action.calls > 0 && memo.push(action.executor.call(this, action));
                    action.calls === calls && action.calls--;
                };

                if(typeof action === 'function') {
                    memo.push(action.call(this));
                };

                return memo;
            }, []);

            this.functions = this.functions.filter(action => typeof action === 'function' || (typeof action === 'object' && action.calls));

            await Promise.all(actions);

            this.timer = void 0
            this.cycle(interval);
        }, interval));
    }

    onInterval(self) {
    
        return new Promise((resolve, reject) => {
            //self && (self.calls = 0); // 0- to stop; 1- to call once mo time
            this.emit('interval');

            //console.log('interval');

            return resolve(); 
        });

        //return Promise.resolve();
    }

    /* async test() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                console.log('TEST executed');
                return resolve();    
            }, 100);
        });
    }

    async test1() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                console.log('TEST1 executed');
                return resolve();    
            }, 100);
        });
    } */
}

module.exports = function(io) {
    socketInitialize(io);

    emitter = new Emitter({ io, interval: 1000 });

    return router;
}