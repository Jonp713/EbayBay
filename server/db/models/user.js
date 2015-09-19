'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var R = require('ramda');
require('./order.js'); //Remove
require('./product.js');//Remove
var Order = mongoose.model('Order');//Remove
var Product = mongoose.model('Product');//Remove
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    photoUrl: {
      type: String,
      default: '/images/default-img.png'
    },
    password: {
      type: String
    },
    salt: {
      type: String
    },
    twitter: {
      id: String,
      username: String,
      token: String,
      tokenSecret: String
    },
    facebook: {
      id: String
    },
    google: {
      id: String
    },
    cart: [{
        quantity: {type: Number, min: 0, default: 1},
        product: {type: ObjectId, ref: 'Product'}
    }]
});
schema.plugin(deepPopulate, {});

schema.methods.transmitToOrder = function() {
  return Order.create({user: this._id, products: this.cart})
  .then(function(order) {
    this.cart = [];
    return Promise.all([Promise.resolve(order), this.save()]);
          //the purpose of this is to both return the order and the user for later use.
  }.bind(this));
};


// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }
    next();
});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});


schema.method('addToCart', function (obj, cb){
    var self = this;
    console.log(obj, 'object coming in')
    //obj argument is passed from middleware and is an obj corresponding to {quantity: num, product: productModel}
    //cb to be called from middleware
    self.deepPopulate('cart.product', function(err, _user) {
        if(err) return cb(err);
        console.log(_user)
        var flag = false;
        self.cart = _user.cart.map(function(element, idx) {
            if(element.product._id.toString() === obj.product._id) {
                flag = true;
                element.quantity += obj.quantity;
            }
            return element;
        });
        if(!flag) self.cart.push(obj);
        //if(!flag) self.cart.push({quantity: obj.quantity, product: obj.product._id});
        self.save(function(err, user) {
            if(err) return cb(err);
            return cb(null,user);
        })
    })
});


schema.method('removeFromCart', function (productObj,cb){
    console.log(productObj);
  var self = this;
    //obj argument is passed from middleware and is an obj corresponding to {quantity: num, product: productModel}
    //cb to be called from middleware
    self.deepPopulate('cart.product', function(err, _user) {
        if(err) return cb(err);
        var index;
        _user.cart.forEach(function(element, idx) {
            if(element.product._id.toString() === productObj.product._id) {
                index = idx;
            }
        });
        self.cart.splice(index, 1);
        self.save(function(err, user) {
            if(err) return cb(err);
            return cb(null,user);
        });
    });
});

schema.method('updateCart', function(cartObj, cb) {
    console.log(cartObj);
    this.cart = cartObj;
    return this.save();

})

mongoose.model('User', schema);
