'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
// var deepPopulate = require('mongoose-deep-populate')(mongoose);

var missingItemHandler = function(error, cb) {
    error.status = 404;
    cb(error);
    //custom error handler for missing users and products
};


router.param('orderId', function(req, res, next, id) {
    Order.findById(id)
    .deepPopulate('products.product.user products.product.location')
    .exec(function(err, order){
        if(err) return missingItemHandler(error, next);
        req.order = order;
        next();
    });
});

router.get('/:orderId', function(req, res, next) {
    res.json(req.order);
});

// router.get('/', function(req, res, next) {
//     Order.getPopulatedOrders(req.query, function(err, orders){
//         if(err) return next(err);
//         res.json(orders);
//     });
// });

router.get('/', function(req, res, next) {
    Order.find(req.query)
    .deepPopulate('products.product.user products.product.location')
    .exec(function(err, orders){
        if(err) return next(err);
        res.json(orders);
    });
});

router.post('/', function(req, res, next) {
    // if(!req.user.isLoggedIn) req.body.userId = userId;
    // need to verify users is logged in - in order to add a product to their page
    // if user is admin, should be able to create product on anyones page
    Order.create(req.body)
        .then(function(results) {
            results.deepPopulate('products.product.user products.product.location', function(err, order){
                if (err) return next(err);
                console.log('newly created order:', order.products[0]);
                res.json(order);
            });
        });
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
