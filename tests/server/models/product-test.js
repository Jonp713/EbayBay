var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');
var User = mongoose.model('User');

//create product

//throws error name, price, userId are not there

describe('Product model', function(){
    var userId;
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Clear test database', function (done) {
        clearDB(done);
    });

    beforeEach('Make a user', function(done){
			User.create({
				firstName: 'Joe',
				lastName: 'A',
				email: 'joe@email'
			}).then(function(user){
				done();
		});
    });

    beforeEach('find the userId', function(done){
			User.findOne().exec()
			.then(function(user){
				userId = user._id;
				done();
			});
    });

    afterEach('Disconnect', function(done){
			clearDB(done);
		});

    it('Product model should exist', function () {
        expect(Product).to.be.a('function');
    });

    describe('Product.create', function(){
		var createdProd; 
		var newProd;

		beforeEach('make a product', function(done){
			newProd = {
				name: 'our cool new product',
				price: 20,
				description: 'better than yours',
				category: 'teddy bears',
				userId: userId,
				quantity: 1
			};

			Product.create(newProd).then(function(prod){
				createdProd = prod;
				done();
			}).then(null, function(err){
			});
		});
		//make a product to test

		it('should have an _id', function(){
			expect(createdProd._id).to.exist;
		});

    	it('should have the right keys', function(){
			var hasRightKeys = Object.keys(newProd).every(function(key){
				return newProd[key] === createdProd[key];
			});
			expect(hasRightKeys).to.be.true;
		});
    });

});