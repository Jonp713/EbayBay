var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Product = mongoose.model("Product");

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

// things to test

/*
	1. params
	2. Get all products in database
	3. Get correct product for search by id
	4. Create new product after post request - permissoins && reflected in the database
	5. test delete route - permissions && reflected in the database
	6. test edit route - permissions && changes reflected in the database
*/



describe('Product Route', function () {

	var userId;

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	beforeEach("Clear test database", function(done) {
		clearDB(done);
	});

	beforeEach("Clear test database", function(done) {
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

	var newProd;
	var newProd2;
	var createdProd;
	var createdProd2;

	beforeEach('make a product', function(done){
		newProd = {
			name: 'our cool new product',
			price: 20,
			description: 'better than yours',
			category: 'teddy bears',
			user: userId,
			quantity: 1
		};

		newProd2 = {
			name: 'our shity new product',
			price: 1,
			description: 'not better than yours',
			category: 'teddy bears',
			user: userId,
			quantity: 1
		};

		Product.create(newProd)
		.then(function(prod){
			createdProd = prod;
		})
		.then(function() {
			return Product.create(newProd2);
		})
		.then(function(newProd) {
			done();
		})
		.then(null, function(err){
		});
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Unauthenticated request', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get a 403 response if an unauthenticated user tries to delete a product', function (done) {
			guestAgent.delete('/api/products/' + createdProd._id)
				.expect(403)
				.end(done);
		});

	});

	describe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			firstName: "Joe",
			lastName: "Eric",
			email: 'joe@gmail.com',
			password: 'shoopdawoop',
			isAdmin: true
		};

		beforeEach('Create a user', function (done) {
			User.create(userInfo, done);
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		it('should delete with 204 response', function (done) {
			console.log('logged in and admin?', createdProd._id)
			loggedInAgent.delete('/api/products/' + createdProd._id).expect(204).end(function (err, response) {
				if (err) return done(err);
				done();
			});
		});

		it("should delete the product from the database", function(done) {
			loggedInAgent.delete('/api/products/' + createdProd._id).end(function(err, response){
				if (err) return done(err);
				return Product.find({_id: createdProd._id}, function(err, result){
					if (err) return done(err);
					expect(result.length).to.equal(0);
					done();
				});
			});
		});

		it("should not drop the entire database", function(done) {
			loggedInAgent.delete('/api/products/' + createdProd._id).end(function (err, response) {
				if (err) return done(err);
				return Product.find({}, function(err, result){
					if (err) return done(err);
					expect(result.length).to.equal(1);
					done();
				});
			});
		});
	});
});
