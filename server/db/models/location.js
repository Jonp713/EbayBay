'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	street: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	// joe wanted us to change it to a collection - we may do this at some point
	 state:{
	 	type: ObjectId,
	 	ref: 'State',
	 	required: true
     },
	zip:{
		type: String,
		required: true,
	}
});


schema.virtual("fulladdress").get(function() {
		return this.street + ", " + (this.city) + ", " + (this.state) + ", " + (this.zip) + ", USA";
});

mongoose.model('Location', schema);
