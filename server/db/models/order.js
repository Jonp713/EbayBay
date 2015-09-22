'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


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
		type:String, 
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

schema.virtual('shipping').get(function() {
    return 5;
});

schema.methods.tax = function () {
	return this.total().then(function(total){
		return total * 0.07;
	});
};

// schema.statics.getPopulatedOrders = function (searchParams, cb) {

// 	return this.find(searchParams).exec(function(err, orders){
// 		if (err) return cb(err);
// 		orders.deepPopulate('products.product.user, products.product.location', function(err, _order){
// 			if(err) return cb(err);
// 			cb(null, _order);
// 		});
// 	});
// };


mongoose.model('Order', schema);
