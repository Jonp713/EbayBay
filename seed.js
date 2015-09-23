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
        content: "My mom always said Sketch Bay is like a box of chocolates. You never know whatcha gonna git.",
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
        content: "Payment flew in so fast I had to duck! Bumped my head, but it wasn’t the buyers fault.",
        stars: 5
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Very polite but I never spoke to him. Great item but I never bought it.",
        stars: 1
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "The plain brown packaging seemed to have worked like a charm & fooled my wife. Thanks!!!",
        stars: 4
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "The plain brown packaging seemed to have worked like a charm & fooled my wife. Thanks!!!",
        stars: 4
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Has anyone else tried pouring this stuff over dry cereal? A-W-E-S-O-M-E!",
        stars: 4
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "no warranty on car! damaged with use! seller will not refund my money.. BEWARE!",
        stars: 1
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "though u did nothing wrong, let this negative feedback teach you that the universe is arbitrary & unfair.",
        stars: 1
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Buying this 1999 Space lunchbox failed to fill the empty void in my life like I hoped it would.",
        stars: 3
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Item never recv'd. No response from seller. I'm out $! Other than that, great transaction.",
        stars: 2
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Excellent communication, but should've poked holes in box before shipping the kitten. Refunded.",
        stars: 5
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Honda R-Type sticker did not add horsepower as advertised.",
        stars: 5
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "What can I say about the 571B Banana Slicer that hasnt already been said about the wheel, penicillin, or the iPhone?",
        stars: 5
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Unfortunately I already had this exact picture tattooed on my chest, but this shirt is very useful in colder weather.",
        stars: 3
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "Its OK Iguess, but the bumpy road majkes it hard to type. And therees a lot of pedeestrians and traffic that keep distracting me fromm my computer.",
        stars: 4
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "The cable knew where to go, and hooked itself into the correct ports without help from me.",
        stars: 5
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "It is not cat food…. The cat's huge and well, doesn't really look much like a cat anymore",
        stars: 5
    },
    {
        byUser: users[Math.floor(Math.random() * users.length)]._id,
        aboutUser: users[Math.floor(Math.random() * users.length)]._id,
        content: "I was hoping that by bidding on this it would make me famous. It didn't work. Life goes on.",
        stars: 2
    }];

        return Review.createAsync(reviews);

};


var seedUsers = function () {

    var users = [
        {
            firstName: "Cara",
            lastName: "Maddy",
            email: 'jm@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
        {
            firstName: "James",
            lastName: "Carrier",
            email: 'carty@fsa.com',
            password: 'password',
            photoUrl: randPhoto()

        },
        {
            firstName: "Omri",
            lastName: "Zeke",
            email: 'omri@fsa.com',
            password: 'password',
			isAdmin: 1,
            photoUrl: randPhoto()
        },
        {
            firstName: "Casidy",
            lastName: "Spencer",
            email: 'cass@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
        {
            firstName: "Brett",
            lastName: "Corey",
            email: 'gabe@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
        {
            firstName: "Earnst",
            lastName: "Coby",
            email: 'ec@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
        {
            firstName: "Pace",
            lastName: "Roscoe",
            email: 'pr@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
        {
            firstName: "Darian",
            lastName: "Malone",
            email: 'dm@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
        {
            firstName: "Laurie",
            lastName: "Whitaker",
            email: 'laurie@fsa.com',
            password: 'password',
            photoUrl: randPhoto()
        },
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
        street: "505 Franklin Ave",
        city: "Brooklyn",
        state: states[31]._id,
        zip: "11238"
    },
    {
        street: "5 Hanover Square",
        city: "New York",
        state: states[31]._id,
        zip: "10004"
    },
    {
        street: "64th St and 5th Ave",
        city: "New York",
        state: states[31]._id,
        zip: "10021"
    },
    {
        street: "207 Avenue A",
        city: "New York",
        state: states[31]._id,
        zip: "10009"
    },
    {
        street: "1720 Grape Ave",
        city: "Boulder",
        state: states[4]._id,
        zip: "80304"
    },
    {
        street: "71 Washington St",
        city: "Bloonfield",
        state: states[29]._id,
        zip: "07003"
    }
    ];
    return Location.createAsync(location);
};


var seedProducts = function (users, location) {
    var products = [
        {
            name: "belly button lint",
            price: 32,
            description: "I have a collection of belly button lint, will trade for muscle car, herley, rifles, gold coins work also or make cash offer. Also interested in motor cycles, no lowball serious only willing to split if you have what I'm looking for,,",
            keywords: ["human", "willing to trade"],
            photo: "http://ak-hdl.buzzfed.com/static/2014-06/9/8/enhanced/webdr07/enhanced-8194-1402316194-17.png",
            category: "Human",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 4
        },
        {
            name: "J. Fred Muggs!",
            price: 425,
            description: "Dave Garroway's lovable chimpanzee sidekick on the original Today show, was actually a nasty ol' critter who once knocked a March of Dimes poster girl off her crutches. The garrulous Garroway, meanwhile, would psych himself for each show by consulting what he called the Doctor--liquid codeine, which he would swig daily before airtime.",
            keywords: ["animal", "cute", "loveable", "live"],
            photo: "http://weknowyourdreams.com/images/monkey/monkey-02.jpg",
            category: "Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 1
        },
        {
            name: "rifraf",
            price: 75,
            description: "Bluegrass song and a well-used couch",
            keywords: ["human", "song", "furniture"],
            photo: "http://i.ytimg.com/vi/y3hNju5yDhE/maxresdefault.jpg",
            category: "Furniture",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 1
        },
        {
            name: "Bacon balm",
            price: 4,
            description: "Just carry around a tube of this Bacon Lip Balm and you can keep your lips moist and meaty around the clock. Warning: Your lips will smell like bacon, but they are not bacon.",
            keywords: ["bacon", "animal", "yumm"],
            photo: "http://mcphee.com/shop/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/b/a/bacon_lip_balm.jpg",
            category: "Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 20
        },
        {
            name: "This project is my life bear!",
            price: 26034,
            description: "Grant's Bears. Small kinship group. Girls been together for six months. Good friends. Stallion was next to mares for 3 months and in with them for 3 months, stallion bred zinnia one month ago. Have pics. May have bred zuri, but we didn't see. 1 stallion and two mares, $19,500 for trio. Stallion ,Zutali, 8 years old. Proven. Mare, Zuri, 12 years old. Mare, Zinnia, 9 years old. Zuri has been handled some and allows petting, has been haltered carefully a couple of times. Zinnia is not handled but is fine in close contact. Zutali is good in close contact and has been completely non aggressive with people and is gentle with his mares. His previous owner says he breeds donkeys too.",
            keywords: ["animal", "live", "living", "buyer beware", "bear"],
            photo: "http://www.blueeyedyonder.com/wp-content/uploads/2011/12/grizzly1.jpg",
            category: "Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 2
        },
        {
            name: "Napoleon's hair",
            price: 9000,
            description: "The hair was cut from his head after he died in exile in 1821 on St Helena by Denzil Ibbetson, commissionary officer on the during the French Emperor's incarceration on the island. The lock is one of 40 lots of memorabilia from Napoleon up for auction.",
            keywords: ["human", "antique", "politics"],
            photo: "http://i.telegraph.co.uk/multimedia/archive/01669/napoleon-hair_1669762c.jpg",
            category: "Human",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 1
        },
        {
            name: "The Best Milkshake ever!",
            price: 205,
            description: "Purple Haze",
            keywords: ["food", "amazing", "yumm"],
            photo: "https://thenypost.files.wordpress.com/2014/07/140707_cordon_gp_9.jpg",
            category: "Milkshake",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 3
        },

        {
            name: "A tub of 1,500 live ladybirds.",
            price: 9,
            description: "Live adult ladybugs. Prefer to eat Aphids. Can devour up to 50 Aphids a day. Will not harm vegetarian.",
            keywords: ["animal", "bugs", "spots"],
            photo: "http://4.bp.blogspot.com/-Djel3yAcCFw/UWine3SyBMI/AAAAAAAAAus/kHd2p38LK4g/s1600/Ladybugs+001.JPG",
            category: "Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 12
        },
        {
            name: "James the giant bear",
            price: 35,
            description: "Not a Fullstack Mascot",
            keywords: ["bear", "animal", "mascot", "priceless", "stuffed animal"],
            photo: "http://cdn1.bigcommerce.com/server1900/dee9d/product_images/theme_images/Giant_Teddy_Bears_at_Park_.jpg?t=1439493405",
            category: "Stuffed Animal",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 5
        },
        {
            name: "Human-size hampster wheel",
            price: 0,
            description: "Free human sized hampster wheel available for pick-up. Can accomodate up to 200lbs. Fully functional. Not reccomended for houses with small children or animals. 50lbs of newspaper also available.",
            keywords: ["hampster", "wheel", "priceless"],
            photo: "http://ak-hdl.buzzfed.com/static/2014-06/9/9/enhanced/webdr06/enhanced-20749-1402321459-28.png",
            category: "Ranom Stuff",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 1
        },
        {
            name: "A nicolas case pillowcase cover",
            price: 35,
            description: "Standard Size 20x30inch. Polyester. Form-fitting design",
            keywords: ["nicolas cage", "pillow", "polyester"],
            photo: "http://g04.a.alicdn.com/kf/HTB11NGUIXXXXXbjXFXXq6xXFXXXh.jpg",
            category: "Random Stuff",
            user: users[Math.floor(Math.random() * users.length)]._id,
            location: location[Math.floor(Math.random() * location.length)]._id,
            quantity: 7
        },
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
        for (var i=0; i<8; i++){
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
