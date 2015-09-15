// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Members Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('/users', function () {

		var userAgent;
    var currentUser;

		beforeEach('Create guest agent', function (done) {
			userAgent = supertest.agent(app);
      User.create({firstName: 'barack', lastName: 'obeezy', email: 'barack@aol.com', password:'Michelle'})
      .then(function(user) {
        currentUser = user;
        done();
      });
		});

		it('should get a 200 response and return an array of users', function (done) {
			userAgent.get('/api/users/')
				.expect(200).end(function(err, response) {
          if(err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body[0]._id).to.equal(currentUser._id.toString());
          done();
        });
		});
    it('should create a user', function(done) {
      userAgent.post('/api/users').send({firstName: 'BeckyLee', lastName: 'Dell', email: 'beckylee@isTheCoolest.com', password: 'ganondorf'})
      .end(function(err, response) {
        if(err) return done(err);
        console.log(response.body);
        expect(response.body).to.be.instanceof(User);
        done();
      });
    });
	});

	describe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			firstName: "Joe",
			lastName: "Eric",
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};

		beforeEach('Create a user', function (done) {
			User.create(userInfo, done);
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		it('should get with 200 response and with an array as the body', function (done) {
			loggedInAgent.get('/api/members/secret-stash').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});

	});

});
