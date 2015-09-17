'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	product:{
		type: ObjectId, ref: "Product",
	},
	quantity: {type: Number, min:0, default:1},
});

mongoose.model('OrderItem', schema);