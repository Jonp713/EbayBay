'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.schema.Types.ObjectId;

var schema = new mongoose.Schema({
	userId: {
		type: ObjectId, ref: "User",
	},
	products:{
		type: [ObjectId], ref: "Product",
	},
	payment:{
		type: ObjectId, ref: "Payment",
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