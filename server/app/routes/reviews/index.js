'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Review = mongoose.model('Review');


var missingItemHandler = function(error, cb) {
    error.status = 404;
    cb(error);
    //custom error handler for missing users and products
};

router.param('reviewId', function(req, res, next, id) {
    Review.findById(id)
        .then(function(element) {
            req.review = element;
            next();
        })
        .then(null, function(error) {
            missingItemHandler(error, next);
        });
});

router.get('/:reviewId', function(req, res, next) {
    res.json(req.review);
});

router.get('/', function(req, res, next) {
    Review.find(req.query)
        //req.query will contain search params for filtering reviews
        //i.e. filtering reviews by aboutUser which will come in handy when on user's page.
        .then(function(results) {
            res.json(results);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    // if(!req.user.isLoggedIn) req.body.userId = userId;
    // need to verify users is logged in - in order to add a product to their page
    // if user is admin, should be able to create product on anyones page
    Review.create(req.body)
        .then(function(results) {
			console.log("yo");
            res.json(results);
        })
        .then(null, next);
});

router.put('/:reviewId', function(req, res, next) {
    if(req.review.byUser !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
    //if user is an admin or is the owner of the review, allow for changes
    Object.keys(req.body).forEach(function(key) {
        if(req.review[key]) req.foundReview[key] = req.body[key];
    });
    req.foundReview.save()
        .then(function(element) {
            res.json(element);
        })
        .then(null, next);
});

router.delete('/:reviewId', function(req, res, next) {
    if(req.review.byUser !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
    req.review.remove()
        .then(function() {
            res.sendStatus(204);
        })
        .then(null, next);
});
