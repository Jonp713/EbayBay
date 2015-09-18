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
var chance = require('chance')(123);


var tempData = {};

function randPhoto () {
    var g = chance.pick(['men', 'women']);
    var n = chance.natural({
        min: 0,
        max: 96
    });
    return 'http://api.randomuser.me/portraits/med/' + g + '/' + n + '.jpg';
}

var seedReviews = function(users) {
    var reviews = [{
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "This person is a horrible horrible person. He came to my house and ate my food",
        stars: 5,
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Tried to hug them but they said not today, Jr. Not today. Decent lamp.",
        stars: 2
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Surprised that a dog managed to use the internet. Bad communication. Great licks.",
        stars: 4
    }];

        return Review.createAsync(reviews);

};


var seedUsers = function () {

    var users = [
        {
            firstName: "James",
            lastName: "Maddy",
            email: 'jm@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
        {
            firstName: "Jimmy",
            lastName: "Carter",
            email: 'carty@fsa.com',
            password: 'password',
            photoUrl: randPhoto()

        },
        {
            firstName: "Omri",
            lastName: "Zeke",
            email: 'omri@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
        {
            firstName: "Gabe",
            lastName: "Neon",
            email: 'gabe@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
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

    products.forEach((prod)=>prod.photoUrl='http://lorempixel.com/400/300/cats/')

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
    }).then(function(products){
        tempData.products = products;
        return seedReviews(tempData.users);
    })
    .then(function() {
       return process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
