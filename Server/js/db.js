var VenueProfile = require('../models/venue').model;
var EventProfile = require('../models/event').model;
var UserProfile = require('../models/user').model;

var settings = require('./settings');

//yelp data
var yelp = require("yelp").createClient({
  consumer_key: settings.YELP_KEY,
  consumer_secret: settings.YELP_SECRET,
  token: settings.YELP_TOKEN,
  token_secret: settings.YELP_TOKEN_SECRET
});

var getUsersEvents = function(userIn, callback) {
  UserProfile.findOne({
          _id: userIn.id
        },
        function(err, user) {
         
         if (err) {
           callback(err);
         }
         else if (!user) {
           // If user does not exist, tell them
           callback("No User");
         } 
         else  {
           var events = [];
           for (ev in user.events) {
             // TODO append events to this list
           }
         }
         
        })
};

var getstuff = function(array, callback) {
  console.log('here');
  yelp.search({
    term: "bar,club",
    location: "Toronto"
  }, function(error, data) {
    parse(data, callback);
  });
};

// Function to create new event
// function takes in params of construction for EventScema
function addEvent(obj, callback) {
  
}


function parse(obj, callback) {
  var inserted = 0;
  if (obj !== undefined) {
    for (var i=0; i< obj.businesses.length; i++) {
      // console.log(obj.businesses[venue]);
      // createVenue(obj.businesses[i]);
      var venue = obj.businesses[i];
      VenueProfile.findOne({
          yelpId: venue.id
        },
        function(err, venInDb) {
          console.log('async');
          // venue not in db yet
          if (err) {
            console.log('Error: ' + err);
            callback(err);
          }
          if (++inserted == obj.businesses.length) {
            callback();
          }
          if (!venInDb) {
            console.log('Hey we did not find a house');
            var createVenue = new VenueProfile();
            createVenue.name = venue.name;
            createVenue.yelpId = venue.id;
            createVenue.description = venue.snippet_text;
            createVenue.latitude = venue.location.coordinate.latitude;
            createVenue.longditude = venue.location.coordinate.longditude;
            createVenue.rating = venue.rating;
            createVenue.url = venue.url;
            createVenue.imageUrl = venue.image_url;
            // add the user to the database
            createVenue.save(function(err) {
              if (err) {
                console.log('Error (could not save): ' + err);
                throw err;
              } else {
                console.log('Added venue succesfully' + createVenue);
                return callback(obj);
              }
            });
          } else {
            console.log('venue exist');
            venInDb.name = venue.name;
            venInDb.yelpId = venue.id;
            venInDb.description = venue.snippet_text;
            venInDb.latitude = venue.location.coordinate.latitude;
            venInDb.longditude = venue.location.coordinate.longditude;
            venInDb.rating = venue.rating;
            venInDb.url = venue.url;
            venInDb.imageUrl = venue.image_url;
            venInDb.save(function(err) {
              if (err) {
                console.log('Error (could not save): ' + err);
                throw err;
              } else {
                console.log('Added venue succesfully' + createVenue);
                return callback(obj);
              }
            });
          }
        });
    }
    return callback(obj);
  } else
    return null;
}

//TODO, add feature where you give money ahead of time, which gaurantees people turn up and means they get the best thing.

module.exports = {
  getInfo: getstuff
};
