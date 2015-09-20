var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var State = mongoose.model('State');

router.param('stateId', function(req, res, next, id) {
    Product.findById(id)
        .then(function(element) {
            req.state = element;
            next();
        })
        .then(null, function(error) {
            missingItemHandler(error, next);
        });
});

router.get('/', function(req, res, next) {
    State.find()
        //req.query will contain search params for filtering products
        .then(function(results) {
            res.json(results);
        })
        .then(null, next);
});

router.get('/:stateId', function(req, res) {
    res.json(req.foundProduct);
});

router.post('/', function(req, res, next) {
    // if(!req.user.isLoggedIn) req.body.userId = userId;
    // need to verify users is logged in - in order to add a product to their page
    // if user is admin, should be able to create product on anyones page
    State.create(req.body)
        .then(function(results) {
            res.json(results);
        })
        .then(null, next);
});


