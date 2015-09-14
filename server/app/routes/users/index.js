'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');


var missingItemHandler = function(error, cb) {
    error.status(404);
    cb(error);
    //custom error handler for missing users and products
};

router.param('userId', function(req, res, next, id) {
    User.findById(id)
        .then(function(element) {
            req.foundUser = element;
            next();
        })
        .then(null, function(error) {
            missingItemHandler(error, next);
        });
});

router.get('/:userId', function(req, res, next) {
    res.json(req.foundUser);
});

router.get('/', function(req, res, next) {
    User.find(req.query)
        //included req.query in the case of possibly filtering users - possibly not needed.
        .then(function(results) {
            res.json(results);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    if(!req.user.isAdmin) delete req.body.isAdmin;
    User.create(req.body)
        .then(function(user) {
            req.login(user, function(error) {
                if(error) throw new Error();
                res.json(user);
            });

        })
        .then(null, next);
});

router.put('/:userId', function(req, res, next) {
    var isAdmin = req.user.isAdmin;
    //checks to see if current user is admin;
    if(req.user !== req.foundUser && !isAdmin) return res.sendStatus(403);
    //if user is an admin or is the viewed user allow for changes
    if(!isAdmin) delete req.body.isAdmin;
    Object.keys(req.body).forEach(function(key) {
        if(req.foundUser[key]) req.foundUser[key] = req.body[key];
    });
    req.foundUser.save()
        .then(function(element) {
            res.json(element);
        })
        .then(null, next);
});

router.delete('/:userId', function(req, res, next) {
    req.foundUser.remove()
        .then(function() {
            res.sendStatus(204);
            //could be 410 - gone.
        })
        .then(null, next);
});
