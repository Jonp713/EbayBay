'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
    byUser: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    aboutUser: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    }
});

schema.static('aggRating').get(function(userId) {
    this.find({aboutUser: userId}).then(function(reviews){
        return reviews.reduce(function(prior, curr){
            return prior + curr.stars;
        })/reviews.length;
    });
});

mongoose.model('Review', schema);
