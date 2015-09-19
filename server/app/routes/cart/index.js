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
    //if the product is in the cart add the quantities
    var index = findIndexOfProductInCart(req.session.cart, req.body.product._id);
    if (index + 1) req.session.cart[index].quantity += req.body.quantity;
    else {
        req.session.cart.push(req.body);
    }

    if (req.user) req.user.addToCart(req.body, function (err, user) {
        if (err) return next(err);
        res.sendStatus(201);
    });
    else res.sendStatus(201);
});
router.delete('/:id', function(req, res, next){
    var index = findIndexOfProductInCart(req.session.cart, req.params.id)
    if(!(index + 1)) {
    	var err = new Error();
        console.log('in the delete error route');
    	err.status = 404;
    	return next(err);
    }
    var productToRemove = req.session.cart.splice(index, 1)[0];
    if(req.user) req.user.removeFromCart(productToRemove, function(err, user) {
        if(err) return next(err);
        res.sendStatus(204);
    });
    else res.sendStatus(204);
});

router.put('/', function(req, res, next) {
    console.log(req.body);
    req.body = req.body.filter(function(element) {
        return !!element.quantity
    })
    req.session.cart = req.body;
    if(req.user) {
        req.user.updateCart(req.body)
        .then(function() {
                res.sendStatus(201);
            })
    }
    else {
        res.sendStatus(201);
    }
});


function findIndexOfProductInCart(cart, id) {
    var mappedCart = cart.map(function(item) {
        return item.product;
    })
    return R.findIndex(R.propEq('_id', id))(mappedCart);
}

