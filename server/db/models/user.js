'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var R = require('ramda');
require('./order.js'); //Remove
require('./product.js');//Remove
require('./orderItem.js');//Remove
var Order = mongoose.model('Order');//Remove
var Product = mongoose.model('Product');//Remove
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var OrderItem = mongoose.model('OrderItem');

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
  return Order.create({userId: this._id, products: this.cart})
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
    //obj argument is passed from middleware and is an obj corresponding to {quantity: num, product: productModel}
    //cb to be called from middleware
    self.deepPopulate('cart.product', function(err, _user) {
        if(err) return cb(err);
        var flag = false;
        self.cart = _user.cart.map(function(element, idx) {
            if(element.product._id === obj.product._id) {
                flag = true;
                element.quantity += obj.quantity;
            }
            return element;
        });
        if(!flag) self.cart.push(obj);
        self.save(function(err, user) {
            if(err) return cb(err);
            return cb(null,user);
        })
    })
  //var self = this;
  //this.populate('cart')
  //.then(function(elements) {
  //  var id;
  //  elements.forEach(function(element) {
  //    if(element.product._id === obj.product._id) {
  //      id = element._id;
  //    }
  //  });
  //  if(!id) return OrderItem.create(obj);
  //  return OrderItem.findByIdAndUpdate(id, {$inc: {quantity: obj.quantity}}).then(function(element) {
  //    return undefined;
  //  });
  //})
  //.then(function(element) {
  //  if(element) self.cart.push(element._id);
  //  return self.save();
  //});
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
