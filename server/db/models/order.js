'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
// var deepPopulate = require('mongoose-deep-populate')(mongoose);
var autopopulate = require('mongoose-autopopulate');


var schema = new mongoose.Schema({
	user: {
		type: ObjectId,
		ref: "User",
	},
	products: [{
		quantity: {type: Number, min: 0},
		product: {type: ObjectId, ref: 'Product', autopopulate: true}
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
	total: {type: Number, min: 0},
	submitted: Boolean
});

schema.plugin(autopopulate);

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


mongoose.model('Order', schema);
