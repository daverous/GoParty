var mongoose = require('mongoose');
var User = require('./partier');


var placeRatingSchema = new mongoose.Schema({
  rated_user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
  },
  rating: {
      line: Number, // clock
      price: Number, //  dolla dolla sign
      music: Number, // music note for
      ambiance: Number // smily face
  }
});

var venueSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  name: String,
  genre: String,
  latitude: String,
  privateVenue : Boolean,
  longditude: String,
  description: String,
  yelpId : String, // TODO this is not yet implemented 
  url : String,
  added: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    default: 0
  },
  evaluations: {
    type: Number,
    default: 0
  },
  open : {
    type : [Boolean]
  }
});

venueSchema.statics.list = function(callback) {
  this.find({}, function(err, venues) {
    if (err) {
      return (err, null);
    } else {
      callback(null, venues);
    }
  });
};



var Venue = mongoose.model('Venue', venueSchema);
var PlaceRating = mongoose.model('PlaceRating', placeRatingSchema);

module.exports = {
  schema: venueSchema,
  model: Venue,
  rschema: placeRatingSchema,
  rmodel: PlaceRating
};
