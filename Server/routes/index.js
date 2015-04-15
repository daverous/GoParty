var express = require('express');
var router = express.Router();
var dbManager = require('../js/db');
var user = require('../models/user').model;
var venue = require('../models/venue').model;
var rating = require('../models/user').rmodel;

// https://scotch.io/tutorials/easy-node-authentication-facebook
module.exports = function(app, passport) {
  var locArray; // 0 is Location, 1 is range, 2 is max

  app.use('/public', express.static('./public'));

  app.get('/listvenues', function(req, res) {
    console.log('here');
    venue.list(function(err, venues) {
      if (!venues) {
        res.send("db empty");
      }
      else
        res.send(venues);
    });
  });

  app.get('/loc/:id', function(req, res) {

    var ids = req.params.id;
    locArray = ids.split('++');
    console.log(locArray);

    dbManager.getInfo(locArray, function(data) {
      console.log('callback');
      if (data === undefined) {
        res.send("error with yelp request");
      } else
        res.send(data);
    });

  });



  app.get('/login', function(req, res, next) {
    console.log('here pal');
    res.render('facebooklogin');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
  });
  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  app.get('/geo', function(req, res) {
    res.render('geo');
  });
  // route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('*', function(req, res) {
    res.render('notfound', 404);
  });

  // app.get('/', function(req, res, next) {
  //   res.render('landing');
  // });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
