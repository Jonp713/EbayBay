'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Promise = require('bluebird');
require('./order.js');
require('./product.js');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var ObjectId = mongoose.Schema.Types.ObjectId;

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
      type: ObjectId,
      ref: 'Product'
    }],
});

schema.methods.transmitToOrder = function() {
  return Order.create({userId: this._id, products: this.cart})
  .then(function(order) {
    this.cart = [];
    return [Promise.resolve(order), this.save()];
  }.bind(this))
  .then(function(arr) {
    return Promise.all(arr);
  });
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

schema.method('addToCart', function (product){
  this.cart.push(product._id);
  return this.save();
});

schema.method('removeFromCart', function (product){
  // if (!(product instanceof Product)) throw new Error('not a product');
  var productIndex = this.cart.indexOf(product._id);
  if (productIndex+1) {
    this.cart.splice(productIndex, 1);
  }
  return this.save();
});


mongoose.model('User', schema);
