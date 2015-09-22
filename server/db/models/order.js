'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Product = mongoose.model('Product');
var R = require('ramda');
var _ = require('lodash');


var schema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
    },
    products: [{
        quantity: {type: Number, min: 0},
        product: {type: ObjectId, ref: 'Product'}
    }],
    date: {
        type: Date,
        default: Date.now
    },
    shippingAdress: {
        streetAddress: String,
        city: String,
        state: String,
        zip: String,
        email: String,
        receiveEmails: Boolean
    },
    payment: {
        cardNumber: String,
        name: String,
        expire: String,
        csv: String
    },
    total: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ['created', 'processing', 'cancelled', 'completed'],
        default: 'created'
    }
});

schema.plugin(deepPopulate, {});


// schema.methods.total = function () {
// 	return 20;
// 	//this.populate("products")
// };

schema.methods.subtotal = function () {
    return 15;
    //this.populate("products")
};

schema.virtual('shipping').get(function () {
    return 5;
});

schema.methods.tax = function () {
    return this.total().then(function (total) {
        return total * 0.07;
    });
};

function createOrEditObj(arr, product) {
    _.reduce(arr, function (obj, cartItem) {
        var relatedItemId = cartItem.product.toString();
        if (!obj[relatedItemId]) {
            obj[relatedItemId] = {
                inSameOrder: 0,
                inSameCategory: product.category === cartItem.product.category,
                ratioOfMatchingKeywords: _.intersection(product.keywords, cartItem.product.keywords).length / _.uniq(product.keywords, cartItem.product.keywords).length
            }
        }
        obj[relatedItemId].inSameOrder++;
        return obj;
    });
}

function findIndex(order, product) {
    var productIndex = -1;
    order.products.some(function (cartItem) {
        productIndex = R.findIndex(R.propEq(product._id, R.path(['product', '_id'], cartItem)));
        return productIndex > -1;
    });
    return productIndex;
}

function calcSim(obj) {
    var arr = [];
    for(var key in obj) {
        var simScore = obj[key].inSameOrder * (1 + .4*obj[key].inSameCategory + .4*obj[key].ratioOfMatchingKeywords);
        var newObj = {id: key, score: simScore};
        arr.push(newObj);
    }
    return arr.sort(function(a, b) {
        return b.score - a.score;
    });
    //rseturns array of objects containing similarities between target object
    //sorted by similarity score
}


schema.statics.getSimilarities = function (product, num) {
    //loop through Orders database and create hashtables for item and other items
    this.findAll()
        .then(function (orders) {
            var obj = {};
            orders.forEach(function (order) {
                if (findIndex(order, product)) {
                    var newArr = _.without(order.products, order.products[productIndex]);
                    obj = createOrEditObj(newArr, product)
                }
            });
            return obj;
        })
        .then(function (obj) {
            return calcSim(obj).slice(0, num);
        })
};


mongoose.model('Order', schema);
