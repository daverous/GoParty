var express = require('express');
var router = express.Router();
var dbManager = require('../js/db');
var User = require('../models/user').model;
var Event = require('../models/event').model
var graph = require('fbgraph');
var settings = require('../js/settings');
var Venue = require('../models/venue').model;
// var rating = require('../models/user').rmodel;

// https://scotch.io/tutorials/easy-node-authentication-facebook
module.exports = function(app, passport) {
  var locArray; // 0 is Location, 1 is range, 2 is max

  app.use('/public', express.static('./public'));

  app.get('/', function(req, res) {
    res.render('home');
  });
  
  app.get('/listvenues', function(req, res) {
    console.log('here');
    Venue.list(function(err, venues) {
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
  
  
  

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }), function(req,res){
//      TODO get user from passport here
      req.session.user = req.body.user; //store user obj in session
    });
    
    // RESTful API to get all events that a user has currently agreed to go to
    
    // app.post('/userInfo' ,isLoggedIn ,
    //   function(req, res) {
    //     dbManager
        
    //   });
    
    
//    RESTFUL API will create event, based on name, description, 
// lat long etc (can be seen in model )
   app.post('/createEvent',isLoggedIn,
   function(req, res) {

     var unName = req.body.name;
     var unDescription = req.body.description;
     var isPrivate = req.body.private; //boolean on if event is private
     var unOwner = req.session.user;
     var newEvent = new Event();
     newEvent.name = unName;
     newEvent.description = unDescription;
     newEvent.isPrivate = JSON.parse(isPrivate);
     newEvent.owner = unOwner;     
     Venue.findOne({
       latitude : req.body.lat,
       longditude : req.body.long
     }, function(venue, err) {
       if (err) {
        throw new Error(err);
       }
       if (!venue) {
         var createVenue = new Venue();
         createVenue.latitude = res.body.lat;
         createVenue.longditude = res.body.long;
         // TODO check name? of location from place
         createVenue.save(function(err) {
              if (err) {
                console.log('Error (could not save): ' + err);
                throw err;
              } 
              else {
                //  save new event Id
                newEvent.location = createVenue._id;
              }
            });
       }
       // if location already exists
       else { 
         newEvent.location = venue._id;
       }
       
     });
     newEvent.save(function(err) {
              if (err) {
                console.log('Error (could not save): ' + err);
                throw err;
              } 
              else {
                res.status(400);
                res.send(newEvent);
                              }
            });
     
   });
   
   
    app.get('/friendlist', function(req, res) {
    graph.setAccessToken(req.session.user.token).setOptions({ timeout: 3000, pool: { maxSockets: Infinity }, headers: {connection: 'keep-alive'} }).get('/me/friends?fields=picture,first_name,last_name', function(err, fbRes) {
        res.status(400);
        res.send({friends: fbRes.data});
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
    console.log('here');
    res.render('notfound');
  });

  app.get('*', function(req, res) {
    res.render('notfound', 404);
  });

  app.get('/', function(req, res, next) {
    res.render('home');
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.status(401);
  res.send('Please Log In')
}
