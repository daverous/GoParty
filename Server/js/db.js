var venueProfile = require('../models/venue').model;



// get yelp data
var yelp = require("yelp").createClient({
  consumer_key: "UqXizzKMtmdC-2rj32YE7Q",
  consumer_secret: "MdDNtIsK029Yccbtp-_f9cRfGL4",
  token: "UCAyWQm60Axw8TNYQvXhX9r8YNfc51Lo",
  token_secret: "GCIfYIjMX4FQxM7CP7BAAuVCbsU"
});


var getstuff = function(array, callback) {
  console.log('here');
  yelp.search({
    term: "bar,club",
    location: "Toronto"
  }, function(error, data) {
    console.log('ppparsee');
    parse(data, callback);
  });
};


function parse(obj, callback) {
  var inserted = 0;
  if (obj !== undefined) {
    for (var i=0; i< obj.businesses.length; i++) {
      // console.log(obj.businesses[venue]);
      // createVenue(obj.businesses[i]);
      var venue = obj.businesses[i];
      venueProfile.findOne({
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
            // TODO update


          }
        });
    }
    return callback(obj);
  } else
    return null;
}

function createVenue(venue) {
  console.log('balls');
  venueProfile.findOne({
      yelpId: venue.id
    },
    function(err, venInDb) {
      console.log('async');
      // venue not in db yet

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
        // TODO update


      }
    });
}

function printAll() {
  
}

module.exports = {
  getInfo: getstuff
};
