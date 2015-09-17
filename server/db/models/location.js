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


schema.virtual("fulladdress").get(function() {
  	return `$(this.street), $(this.city), $(this.state), $(this.zip), USA`;
});

mongoose.model('Location', schema);