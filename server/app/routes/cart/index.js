'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');


router.get('/', function(req, res, next) {
    res.json(req.session.cart);
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    console.log('req.session', req.session);
    if(!req.session.cart) req.session.cart = [];
    req.session.cart.push(req.body.product);
    if(req.user) req.user.addToCart(req.body.product);
    res.sendStatus(201);
});
