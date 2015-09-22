'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Product = mongoose.model('Product');
var R = require('ramda');
var _ = require('lodash');
var Promise = require('bluebird');


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
	//returns a promise for similarity obj
	console.log('increate', arr);
	var promisedArr = [];
	//make array of products in arr (items in order)
	for (var i = 0; i<arr.length; i++){
		promisedArr.push(Product.findById(arr[i].product).exec());
	}
	return Promise.all(promisedArr)
	.then(function(prodArr){
		return _.reduce(prodArr, function (obj, popProd) {
			console.log('cart item after pop', popProd)
	        var relatedItemId = popProd._id;
	        console.log('id', relatedItemId)
	        console.log(product)
	        if (!obj[relatedItemId]) {
	            obj[relatedItemId] = {
	                inSameOrder: 0,
	                inSameCategory: product.category === popProd.category,
	                ratioOfMatchingKeywords: _.intersection(product.keywords, popProd.keywords).length / _.uniq(product.keywords, popProd.keywords).length || 0
	            }
	        }
	        obj[relatedItemId].inSameOrder++;
	        console.log('obj after adding', obj)
	        return obj;
	    },{});
	});
}

function findIndex(order, product) {
    var productIndex = -1;
    order.products.some(function (cartItem, index) {
    	if(cartItem.product.toString() === product._id.toString()) productIndex = index;
        return productIndex > -1;
    });
    return productIndex;
}

function calcSim(obj) {
    //returns array of objects containing similarities between target object
    //sorted by similarity score
    var arr = [];
    for(var key in obj) {
        var simScore = obj[key].inSameOrder * (1 + .4*obj[key].inSameCategory + .4*obj[key].ratioOfMatchingKeywords);
        var newObj = {id: key, score: simScore};
        arr.push(newObj);
    }
    return arr.sort(function(a, b) {
        return b.score - a.score;
    });
}


schema.statics.getSimilarities = function (product, num) {
    //loop through Orders database and create hashtables for item and other items
    return this.find()
        .then(function (orders) {
            var allSharedProds = [];
            orders.forEach(function (order) {
            	var productIndex = findIndex(order, product)
                if (productIndex > -1) {
                	// console.log('prod index', productIndex)
                	console.log(order.products)
                	//collect all the products that are in an order with the ref product
                    allSharedProds = allSharedProds.concat(_.without(order.products, order.products[productIndex]));
                    // console.log('newArr', newArr)
                    // console.log('obj', obj)
                    console.log('shared', allSharedProds);
                    // console.log('obj after create', obj)
                }
               
            });
            return allSharedProds;
        })
        .then(function(allSharedProds){
        	//return object with sim props for each shared prop
        	console.log('allSharedProds', allSharedProds)
        	if (allSharedProds.length) return createOrEditObj(allSharedProds, product);
        })
        // return obj;
        // })
        .then(function (obj) {
        	// console.log('returning sim from db', obj)
            return calcSim(obj).slice(0, num);
        });
};


mongoose.model('Order', schema);
