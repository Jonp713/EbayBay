'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var R = require('ramda');


router.get('/', function(req, res, next) {
    res.json(req.session.cart);
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    console.log('req.session', req.session);
    //make sure there is a cart on the session
    if(!req.session.cart) req.session.cart = [];

    //if the product is in the cart add the quantities
    var findIndexInCart = R.findIndex(R.propEq('_id', req.body.product._id));
    var index = findIndexInCart(req.session.cart);
    if(index + 1) req.session.cart[index].quantity += req.body.quantity;
    else {
		req.session.cart.push(req.body.product);
    }

    /// FIND USER IN DB, user.cart = req.session.cart
    ///deal with product quantities - changing in cart changes in db

    if(req.user) req.user.addToCart(req.body, function(err, user) {
        if(err) return next(err);
        res.sendStatus(201);
    });
    else res.sendStatus(201);

//update route - decrement

});
