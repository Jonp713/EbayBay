/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
//--- server/db/index.js

The name of the database used is set in your environment files:
//--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Location = Promise.promisifyAll(mongoose.model('Location'));
var Product = Promise.promisifyAll(mongoose.model('Product'));

var tempData = {};

var seedUsers = function () {

    var users = [
        {
            firstName: "James",
            lastName: "Maddy",
            email: 'jm@fsa.com',
            password: 'password'
        },
        {
            firstName: "Jimmy",
            lastName: "Carter",
            email: 'carty@fsa.com',
            password: 'password'
        },
        {
            firstName: "Omri",
            lastName: "Zeke",
            email: 'omri@fsa.com',
            password: 'password'
        },
        {
            firstName: "Gabe",
            lastName: "Neon",
            email: 'gabe@fsa.com',
            password: 'password'
        }
    ];

    return User.createAsync(users);

};

var seedLocation = function() {
    var location = [
    {
        street: "24 St Andrews Place",
        city: "Brooklyn",
        state: "New York",
        zip: "11216"
    },
    {
        street: "26 St Andrews Place",
        city: "Brooklyn",
        state: "New York",
        zip: "11216"
    },
    {
        street: "5 Hanover Square",
        city: "New York",
        state: "New York",
        zip: "10004"
    },
    {
        street: "1720 Grape Ave",
        city: "Boulder",
        state: "Colorado",
        zip: "80304"
    }
    ];
    return Location.createAsync(location);
};

var seedProducts = function (users, location) {
    var products = [
        {
            name: "Patrick the teddy bear",
            price: 20,
            description: "Fullstack Mascot",
            category: "Stuffed Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 1
        },
        {
            name: "James the giant bear",
            price: 15,
            description: "Not a Fullstack Mascot",
            category: "Stuffed Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 2
        },
        {
            name: "This project is my life bear",
            price: 25,
            description: "I'm scary, I swear!",
            category: "Real Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 3
        },
        {
            name: "The Best Milkshake ever!",
            price: 205,
            description: "Purple Haze",
            category: "Milkshake",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 1
        }
    ];

    return Product.createAsync(products);

};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function (users) {
		
		tempData.users = users;
		
		return seedLocation();
		
    }).then(function(location){
        
        tempData.location = location;
        console.log(chalk.green('Seed successful!'));
        return seedProducts(tempData.users, tempData.location);
    }).then(function() {
       return process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
