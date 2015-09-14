'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	name: {
		type: String,
	},
	price: {
		type: Number,
	},
	description:{
		type: String
	},
	keywords:{
		type: [String],
	},
	photo: {
		type: String,
		default: '',
	},
	category: {
		type: String,
	},
	user: {
		type: ObjectId, ref:"user",
		required : true,
	},
	location: {
		type: ObjectId, ref:"location",
		required : true,
	},
	quantity: {type: Number, default: 1, min: 0},
});

mongoose.model('Product', schema);