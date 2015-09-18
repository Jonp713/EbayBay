'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	user: {
		type: ObjectId, ref: "User",
		required: true,
	},
	products:{
		type: [ObjectId], ref: "Product",
	},
	date: {type: Date, default: Date.now},


});

schema.methods.total = function () {

	return 20;
	//this.populate("products")
};

schema.virtual('shipping').get(function() {
    return 5;
});

schema.methods.tax = function () {

	return this.total().then(function(total){

		return total * .07;

	});
};

mongoose.model('Order', schema);
