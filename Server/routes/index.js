var express = require('express');
var router = express.Router();
var dbManager = require('../js/db');
var user = require('../models/user').model;
var graph = require('fbgraph');
var settings = require('../js/settings');
var venue = require('../models/venue').model;
var rating = require('../models/user').rmodel;

// https://scotch.io/tutorials/easy-node-authentication-facebook
module.exports = function(app, passport) {
  var locArray; // 0 is Location, 1 is range, 2 is max

  app.use('/public', express.static('./public'));

  app.get('/', function(req, res) {
    res.render('home');
  });
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



  app.get('/login', function(req, res) {
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
    
    
//    RESTFUL API will create event, based on name, description, 
// lat long etc (can be seen in model )
   app.post('/createEvent',
   function(req, res) {
//     TODO need to ensure authentication here
// Could potentially be done using SESSION? OR cookie? 
     var unName = req.body.name;
     var unDescription = req.body.description;
     var unLocation = req.body.location; //THIS SHOULD BE PRIMARY key of venue
     var isPrivate = req.body.private; //boolean on if event is private
     var unOwner = req.body.owner; // Maybe check auth here too? 
     
   });
    app.get('/friendlist', function(req, res) {
    graph.setAccessToken(req.session.access_token).setOptions({ timeout: 3000, pool: { maxSockets: Infinity }, headers: {connection: 'keep-alive'} }).get('/me/friends?fields=picture,first_name,last_name', function(err, fbRes) {
        res.send({friends: fbRes.data});
        for (var i = 0; i< fbRes.data.length; i++) {
          user.findOne({
//            TODO look at responses from facebook
          })
        }
    });
});

  app.get('/geo', function(req, res) {
    res.render('geo');
  });
  // route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  app.get('/home', function(req, res) {
    res.render('home');
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
