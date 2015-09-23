'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
// var Location = mongoose.model('Location');
var Order = mongoose.model('Order');
var Promise = require('bluebird');
var _ = require('lodash');


var missingItemHandler = function(error, cb) {
    console.log("couldn't find the product");
    error.status = 404;
    cb(error);
    //custom error handler for missing users and products
};

router.param('productId', function(req, res, next, id) {
    Product.findById(id)
        .then(function(element) {
            req.foundProduct = element;
            next();
        })
        .then(null, function(error) {
            missingItemHandler(error, next);
        });
});

router.get('/:productId', function(req, res) {
    res.json(req.foundProduct);
});

router.get('/', function(req, res, next) {
    var newObj = {};
    for(var i in req.query) {
        if(i !== 'user') {
            newObj[i] = RegExp('\w*' + req.query[i] + "\w*", 'i');
        }
    }
    Product.find(newObj)
        //req.query will contain search params for filtering products
        .then(function(results) {
            res.json(results);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    // if(!req.user.isLoggedIn) req.body.userId = userId;
    // need to verify users is logged in - in order to add a product to their page
    // if user is admin, should be able to create product on anyones pag
    var productObj = req.body;
    productObj.user = req.user._id;
    Product.create(productObj)
    .then(function(results) {
            console.log('results', results);
            res.json(results);
        })
    .then(null, next);

    //var productObj = req.body;
    //productObj.user = req.user._id;
    //productObj.location.state = productObj.location.state._id;
    //console.log('productObj', productObj);
    //Location.findOrCreate(productObj.location)
    //    .then(function(location) {
    //        productObj.location = location._id;
    //        return productObj;
    //    })
    //    .then(function(productObj) {
    //        return Product.create(productObj);
    //    })
    //    .then(function(results) {
    //        console.log('results', results);
    //        res.json(results);
    //    })
    //    .then(null, next);
});

router.put('/:productId', function(req, res, next) {
    if(req.foundProduct.user !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
    //if user is an admin or is the owner of the product, allow for changes
    Object.keys(req.body).forEach(function(key) {
        if(req.foundProduct[key]) req.foundProduct[key] = req.body[key];
    });
    req.foundProduct.save()
        .then(function(element) {
            res.json(element);
        })
        .then(null, next);
});

router.delete('/:productId', function(req, res, next) {
    console.log('req.user', req.user);
    if (!req.user || (!req.user.isAdmin && req.foundProduct.user !== req.user._id)){
        return res.sendStatus(403);
    }
    // console.log('am I an admin?', req.user.isAdmin)
    req.foundProduct.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

router.get('/:productId/recommendations/:num', function(req, res, next) {
    Order.getSimilarities(req.foundProduct, req.params.num).then(function(simProds){
        console.log('sim prods', simProds);
        res.json(simProds);
    });
});

router.get('/recommendations/:num', function(req, res, next) {
    console.log(req.query);
    var cartItems = req.query;
    var productArr = [];
    var idsArr = []
    for(var i in cartItems) {
        idsArr.push(cartItems[i]);
        var newPromise = Product.findById(cartItems[i])
        .then(function(element){
                return Order.getSimilarities(element, req.params.num)
            });
        productArr.push(newPromise);
    }
    Promise.all(productArr)
        .then(function(arr) {
            var idObj = {};
            arr = _.flatten(arr).sort(function(a,b) {
                return b.score - a.score;
            });
            arr = arr.filter(function(element) {
                console.log('element', element);
                if(!idObj[element.id]) {
                    idObj[element.id] = 1;
                    return true;
                }
                else {
                    return false;
                }
            })


            console.log('arr',arr);
            arr = arr.filter(function(element) {
                console.log(element);
                return idsArr.indexOf(element.product._id.toString()) === -1;
            });
            res.json(arr.slice(0, req.params.num));
        })
});
