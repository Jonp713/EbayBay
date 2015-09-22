'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Promise = require('bluebird');
require('./order.js'); //Remove
require('./product.js');//Remove
var Order = mongoose.model('Order');//Remove
var Product = mongoose.model('Product');
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    firstName: {
      type: String,
      // required: true
    },
    lastName: {
      type: String,
      // required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      unique: true,
      // required: true
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
  // need to add check that there are enough products available. Check quantity
  var cartPromises = Promise.promisifyAll(this.cart);
  cartPromises.map(function(cartItem) {
    Product.find(cartItem.product._id)
    .then(function(product) {
      if (cartItem.quantity > product.quantity){
        cartItem.quantity = product.quantity;
      }
    });
  })
  .then(function() {
  return Order.create({user: this._id, products: this.cart});
  })
  .then(function(order) {
    this.cart = [];
    return Promise.all([Promise.resolve(order), this.save()]);
          //the purpose of this is to both return the order and the user for later use.
  }
  .bind(this));
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
        self.cart = _user.cart.map(function(element) {
            if(element.product._id.toString() === obj.product._id) {
                flag = true;
                element.quantity += obj.quantity;
                //if the new quantity is more than availible in db inventory, quantity is inventory max
                if(element.quantity > element.product.quantity) element.quantity = element.product.quantity;
            }
            return element;
        });
        if(!flag) self.cart.push(obj);
        //if(!flag) self.cart.push({quantity: obj.quantity, product: obj.product._id});
        self.save(function(err, user) {
            if(err) return cb(err);
            return cb(null,user);
        });
    });
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
});

schema.method('mergeCart', function(sessionCart, cb) {
  //on login, merges session.cart with user.cart
  //cartObj is session.cart

    //Justin version
    //I kept your basic solution but just made some modifications

  var self = this;
  self.cart.forEach(function(cartItem){
    var idx = false;
    sessionCart.forEach(function(sessionCartItem, index){
      if(sessionCartItem.product._id === cartItem.product.toString()) {
        cartItem.quantity = sessionCartItem.quantity;
        //Shouldn't we be adding to the cart not just modifying?
          //otherwise why not just set the user cart to session cart
        idx = index;
      }
    });
    //remove the matched product from the session cart
    if (idx) sessionCart.splice(idx, 1);
  });
  
  sessionCart.forEach(function(cartItem){
    self.cart.push({product:cartItem.product._id, quantity: cartItem.quantity})
  });
        
  return this.save(function(err, user) {
      if(err) return cb(err);
      user.deepPopulate('cart.product, cart.product.user, cart.product.location', function(err, _user) {
          if(err) return cb(err);
          cb(null, _user);
      })
  });
});

mongoose.model('User', schema);
