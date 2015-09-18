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
    //make sure there is a cart on the session
    if (!req.session.cart) req.session.cart = [];
    //console.log('req.body.product', req.body.product);

    //if the product is in the cart add the quantities
    var index = findIndexOfProductInCart(req.session.cart, req.body.product._id);
    console.log('index: ', index);
    console.log(req.body.product);
    if (index + 1) req.session.cart[index].quantity += req.body.quantity;
    else {
        req.session.cart.push(req.body);
    }

    if (req.user) req.user.addToCart(req.body, function (err, user) {
        if (err) return next(err);
        res.sendStatus(201);
    });
    else res.sendStatus(201);
    console.log(req.session);
});
router.delete('/:id', function(req, res, next){
    console.log('in the delete route',req.params.id);
    var index = findIndexOfProductInCart(req.session.cart, req.params.id)
    if(!(index + 1)) {
    	var err = new Error();
        console.log('in the error route');
    	err.status = 404;
    	return next(err);
    }
    var productToRemove = req.session.cart.splice(index, 1)[0];
    if(req.user) req.user.removeFromCart(productToRemove, function(err, user) {
        if(err) return next(err);
        res.sendStatus(204);
    });
});

function findIndexOfProductInCart(cart, id) {
    console.log(cart);
    var mappedCart = cart.map(function(item) {
        return item.product;
    });
    return R.findIndex(R.propEq('_id', id))(mappedCart);
}
