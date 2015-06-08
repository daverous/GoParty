var mongoose = require('mongoose');
var User = require('./user');

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
  name: String,
  genre: String,
  latitude: String,
  privateVenue : Boolean,
  longditude: String,
  description: String,
  yelpId : String,
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
  // attending : {
  //   type: [userSchema]
  // },
  open : {
    type : [Boolean]
  }
  // TODO this will be for the users.
  // _attending: [userSchema],
  // _friends: [{
  //     _id: { type: mongoose.Schema.ObjectId, ref: 'User' },
  //     firstName : { type: String, ref: 'User'},
  //     lastName : { type: String, ref: 'User'},
  //     email: { type: String, ref: 'User'},
  //     username: { type: String, ref: 'User'},
  //     rating: {type: Number, default: 0, ref: 'User'},
  //     evaluations: {type: Number, default: 0, ref: 'User'},
  //     deleted: {type: Boolean, default: false}
  // }],
  // _ratings: [placeRatingSchema]
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
  scheme: venueSchema,
  model: Venue,
  rschema: placeRatingSchema,
  rmodel: PlaceRating
};
