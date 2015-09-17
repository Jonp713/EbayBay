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
		default: ''
	},
	category: {
		type: String
	},
	userId: {
		type: ObjectId, ref:"user",
		required : true
	},
	location: {
		type: ObjectId, ref:"location"
	},
	quantity: {
		type: Number,
		default: 1,
		min: 0
	},
});

mongoose.model('Product', schema);