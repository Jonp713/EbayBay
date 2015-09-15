'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	street: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state:{
		type: String,
		required: true,
	},
	zip:{
		type: String,
		required: true,
	}
});

mongoose.model('Location', schema);