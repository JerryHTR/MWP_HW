var bcrypt = require('bcrypt-as-promised');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');
var __ = require('lodash');

module.exports = function(db) {
  var users = db.collection('users');

  return {
    findUser: function(username, password) {
      return users.findOne({username: username}).then(function(user) {
        return user ? bcrypt.compare(password, user.password).then(function() {
          return user;
        }) : Promise.reject("user doesn't exist");
      });
    },

    createUser: function(user) {
      var iteration = 10;
      return bcrypt.hash(user.password, iteration).then(function(hash) {
        user.password = hash;
        return users.insert(user);
      });
    },

    checkUser: function(user) {
      var formatErrors = validator.findFormatErrors(user);
      return new Promise(function(resolve, reject) {
        formatErrors ? reject(formatErrors) : resolve(user);
      }).then(function() {
        return users.findOne(getQueryForUniqueInAttributes(user)).then(function(existedUser) {
          debug("existed user: ", existedUser);
          return existedUser ? Promise.reject("该用户已存在") : Promise.resolve(user);
        });
      });
    }
  }
}

function getQueryForUniqueInAttributes(user) {
  return {
    $or: __(user).omit('password').pairs().map(pairToObject).value()
  };
}

function pairToObject(pair) {
  obj = {};
  obj[pair[0]] = pair[1];
  return obj;
}
