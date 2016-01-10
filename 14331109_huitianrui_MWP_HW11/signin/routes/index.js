var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:index');

module.exports = function(db) {
  /* GET home page. */
  var userManager = require('../models/user')(db);

  router.get('/signin', function(req, res, next) {
    res.render('signin', { title: '登录' });
  });

  router.post('/signin', function(req, res, next) {
    userManager.findUser(req.body.username, req.body.password)
      .then(function(user) {
        req.session.user = user;
        res.redirect('/detail');
      })
      .catch(function(error) {
        res.render('signin', { title: '登录', error: '用户名密码错误'});
      });
  });

  router.get('/signout', function(req, res, next) {
    delete req.session.user;
    res.redirect('signin');
  });

  router.get('/signup', function(req, res, next) {
    res.render('signup', { title: '注册' , user: {}});
  });

  router.post('/signup', function(req, res, next) {
    var user = req.body;
    userManager.checkUser(user)
      .then(userManager.createUser)
      .then(function() {
        req.session.user = user;
        res.redirect('/detail');
      })
      .catch(function(error) {
        res.render('signup', { title: '注册', user: user, error: error});
      });
  });

  router.all('*', function(req, res, next) {
    req.session.user ? next() : res.redirect('/signin');
  });

  router.get('/detail', function(req, res, next) {
    res.render('detail', { title: '详情', user: req.session.user });
  });

  return router;
}
