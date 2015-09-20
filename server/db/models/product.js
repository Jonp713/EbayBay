'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description:{
		type: String
	},
	keywords:{
		type: [String]
	},
	photo: {
		type: String,
	},
	category: {
		type: String
	},
	user: {
		type: ObjectId, ref:"User",
		required : true
	},
	location: {
		type: ObjectId, ref:"Location"
	},
	quantity: {
		type: Number,
		default: 1,
		min: 0
	},
});

//schema.methods.createProductAndLocation = function(productObj) {
//
//}

mongoose.model('Product', schema);
