'use strict'

const express = require('express');

let router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

let types = require('./api');

let patterns = ['/:type\::id\.:action', '/:type\.:action', '/:type\::id', '/:type'];

router.all(patterns, async (req, res, next) => {
    let {type, id, action} = req.params;

    let object = new types[type](req.headers.authorization, id);

    let executor = action ? object[action].bind(object) : object.default.bind(object);

    let result = await executor(req.body || req.query);

    //let auth = object.payload && object.payload.auth;
    let { token, auth, error } = object;

    res.json({ token, auth, error, ...result } || {}).end();
});

module.exports = router;