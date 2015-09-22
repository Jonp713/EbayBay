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
var State = Promise.promisifyAll(mongoose.model('State'));
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

var seedState = function() {
    var states = [
        {
            name: 'Alabama',
            abrv: 'AL'
        },
        {
            name: 'Arkansas',
            abrv: 'AK'
        },
        {
            name: 'Arizona',
            abrv: 'AZ'
        },
        {
            name: 'California',
            abrv: 'CA'
        },
        {
            name: 'Colorado',
            abrv: 'CO'
        },
        {
            name: 'Connecticut',
            abrv: 'CT'
        },
        {
            name: 'Delaware',
            abrv: 'DE'
        },
        {
            name: 'Florida',
            abrv: 'FL'
        },
        {
            name: 'Georgia',
            abrv: 'GA'
        },
        {
            name: 'Hawaii',
            abrv: 'HI'
        },
        {
            name: 'Idaho' ,
            abrv: 'ID'
        },
        {
            name: 'Illinois' ,
            abrv: 'IL'
        },
        {
            name: 'Indiana' ,
            abrv: 'IN'
        },
        {
            name: 'Iowa' ,
            abrv: 'IA'
        },
        {
            name: 'Kansas' ,
            abrv: 'KS'
        },
        {
            name: 'Kentucky' ,
            abrv: 'KY'
        },
        {
            name: 'Louisiana' ,
            abrv: 'LA'
        },
        {
            name: 'Maine' ,
            abrv: 'ME'
        },
        {
            name: 'Maryland',
            abrv: 'MD'
        },
        {
            name: 'Massachusetts',
            abrv: 'MA'
        },
        {
            name: 'Michigan',
            abrv: 'MI'
        },
        {
            name: 'Minnesota',
            abrv: 'MN'
        },
        {
            name: 'Missouri',
            abrv: 'MO'
        },
        {
            name: 'Mississippi',
            abrv: 'MS'
        },
        {
            name: 'Missouri',
            abrv: 'MO'
        },
        {
            name: 'Montana',
            abrv: 'MT'
        },
        {
            name: 'Nebraska',
            abrv: 'NE'
        },
        {
            name: 'Nevada',
            abrv: 'NV'
        },
        {
            name: 'New Hampshire',
            abrv: 'NH'
        },
        {
            name: 'New Jersey',
            abrv: 'NJ'
        },
        {
            name: 'New Mexico',
            abrv: 'NM'
        },
        {
            name: 'New York',
            abrv: 'NY'
        },
        {
            name: 'North Carolina',
            abrv: 'NC'
        },
        {
            name: 'North Dakota',
            abrv: 'ND'
        },
        {
            name: 'Ohio',
            abrv: 'OH'
        },
        {
            name: 'Oklahoma',
            abrv: 'OK'
        },
        {
            name: 'Oregon',
            abrv: 'OR'
        },
        {
            name: 'Pennsylvania',
            abrv: 'PA'
        },
        {
            name: 'Rhode Island',
            abrv: 'RI'
        },
        {
            name: 'South Carolina',
            abrv: 'SC'
        },
        {
            name: 'South Dakota',
            abrv: 'SD'
        },
        {
            name: 'Tennessee',
            abrv: 'TN'
        },
        {
            name: 'Texas',
            abrv: 'TX'
        },
        {
            name: 'Utah',
            abrv: 'UT'
        },
        {
            name: 'Vermont',
            abrv: 'VT'
        },
        {
            name: 'Virginia',
            abrv: 'VA'
        },
        {
            name: 'Washington',
            abrv: 'WA'
        },
        {
            name: 'West Virginia',
            abrv: 'WV'
        },
        {
            name: 'Wisconsin',
            abrv: 'WI'
        },
        {
            name: 'Wyoming',
            abrv: 'WY'
        }
    ]
    return State.createAsync(states);
}

var seedLocation = function(states) {
    var location = [
    {
        street: "24 St Andrews Place",
        city: "Brooklyn",
        state: states[31]._id,
        zip: "11216"
    },
    {
        street: "26 St Andrews Place",
        city: "Brooklyn",
        state: states[31]._id,
        zip: "11216"
    },
    {
        street: "5 Hanover Square",
        city: "New York",
        state: states[31]._id,
        zip: "10004"
    },
    {
        street: "1720 Grape Ave",
        city: "Boulder",
        state: states[4]._id,
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
            photo: "http://thecatapi.com/api/images/get?format=src&type=gif",
            category: "Stuffed Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 1
        },
        {
            name: "James the giant bear",
            price: 15,
            description: "Not a Fullstack Mascot",
            photo: "http://thecatapi.com/api/images/get?format=src&type=gif",
            category: "Stuffed Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 2
        },
        {
            name: "This project is my life bear",
            price: 25,
            description: "I'm scary, I swear!",
            photo: "http://thecatapi.com/api/images/get?format=src&type=gif",
            category: "Real Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 3
        },
        {
            name: "The Best Milkshake ever!",
            price: 205,
            description: "Purple Haze",
            photo: "http://thecatapi.com/api/images/get?format=src&type=gif",
            category: "Milkshake",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 1
        }
    ];

    // the function below wasn't working, so I commented it out
    // products.forEach((prod)=>prod.photo='http://lorempixel.com/400/300/cats/');

    return Product.createAsync(products);

};

var seedOrders = function (users, products) {

        //make an array of order items
        var orderProducts = [];
            //i must not be changed to a number higher than the number of products in the db
            //using this method instead of math.random so that we don't risk adding the same product twice
        for (var i=0; i<3; i++){
            orderProducts.push({
                product: products[i]._id,
                // Math.ceil will avoid giving 0 as quantity
                quantity: (Math.ceil(Math.random()) * products[i].quantity)
            });
        }


        var order = [{
            user: users[Math.floor(Math.random() * users.length)]._id,
            products: orderProducts,
            
        }];

        return Order.createAsync(order);

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

        return seedState();
    }).then(function(states) {
        tempData.states = states;
        return seedLocation(tempData.states);
    }).then(function(location){
        tempData.location = location;
        console.log(chalk.green('Seed successful!'));
        return seedProducts(tempData.users, tempData.location);
    }).then(function(products){
        tempData.products = products;
        return seedReviews(tempData.users);
    })
    .then(function(){
        return seedOrders(tempData.users, tempData.products);
    })
    .then(function() {
       return process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
