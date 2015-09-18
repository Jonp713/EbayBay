'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Location = mongoose.model('Location');


var missingItemHandler = function(error, cb) {
    error.status(404);
    cb(error);
    //custom error handler for missing users and products
};

router.param('locationId', function(req, res, next, id) {
    Location.findById(id)
        .then(function(element) {
            req.location = element;
            next();
        })
        .then(null, function(error) {
            missingItemHandler(error, next);
        });
});

router.get('/:locationId', function(req, res, next) {
    res.json(req.location);
});

router.get('/', function(req, res, next) {
    Location.find()
		.then(function(results) {
			console.log(results);
			
            res.json(results);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    // if(!req.user.isLoggedIn) req.body.userId = userId;
    // need to verify users is logged in - in order to add a product to their page
    // if user is admin, should be able to create product on anyones page
    Location.create(req.body)
        .then(function(results) {
            res.json(results);
        })
        .then(null, next);
});

router.put('/:locationId', function(req, res, next) {
    if(req.location.byUser !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
    //if user is an admin or is the owner of the location, allow for changes
    Object.keys(req.body).forEach(function(key) {
        if(req.location[key]) req.foundLocation[key] = req.body[key];
    });
    req.foundLocation.save()
        .then(function(element) {
            res.json(element);
        })
        .then(null, next);
});

router.delete('/:locationId', function(req, res, next) {
    if(req.location.byUser !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
    req.location.remove()
        .then(function() {
            res.sendStatus(204);
        })
        .then(null, next);
});
