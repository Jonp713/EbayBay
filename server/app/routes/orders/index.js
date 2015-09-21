'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

var missingItemHandler = function(error, cb) {
    error.status = 404;
    cb(error);
    //custom error handler for missing users and products
};


router.param('orderId', function(req, res, next, id) {
    Order.findById(id)
        .then(function(element) {
            req.order = element;
            next();
        })
        .then(null, function(error) {
            missingItemHandler(error, next);
        });
});

router.get('/:orderId', function(req, res, next) {
    res.json(req.order);
});

router.get('/', function(req, res, next) {
    Order.find(req.query)
        //req.query will contain search params for filtering products
        .then(function(results) {
            res.json(results);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    // if(!req.user.isLoggedIn) req.body.userId = userId;
    // need to verify users is logged in - in order to add a product to their page
    // if user is admin, should be able to create product on anyones page
    Order.create(req.body)
        .then(function(results) {
            res.json(results);
        })
        .then(null, next);
});

//router.put('/:productId', function(req, res, next) {
//    if(req.product.userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
//    //if user is an admin or is the owner of the product, allow for changes
//    Object.keys(req.body).forEach(function(key) {
//        if(req.foundProduct[key]) req.foundProduct[key] = req.body[key];
//    });
//    req.foundProduct.save()
//        .then(function(element) {
//            res.json(element);
//        })
//        .then(null, next);
//});

//router.delete('/:productId', function(req, res, next) {
//    if(req.product.userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
//    req.foundProduct.remove()
//        .then(function() {
//            res.sendStatus(204);
//        })
//        .then(null, next);
//});
