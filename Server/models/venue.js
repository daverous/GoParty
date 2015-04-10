var mongoose = require('mongoose');
var userSchema = require('./user');

var placeRatingSchema = new mongoose.Schema({
  rated_friend: {
    type: mongoose.Schema.ObjectId,
    ref: 'Venue'
  },
  rating: {
    type: Number
  }
});

var venueSchema = new mongoose.Schema({
  name: String,
  latitude: String,
  longditude: String,
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
  // TODO this will be for the users.
  _attending: [userSchema],
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
  _ratings: [ratingSchema]
});

venueSchema.statics.list = function(callback) {
  this.find({}, function(err, users) {
    if (err) {
      return (err, null);
    } else {
      callback(null, users);
    }
  });
};

var User = mongoose.model('User', userSchema);
var Rating = mongoose.model('Rating', ratingSchema);

module.exports = {
  schema: userSchema,
  model: User,
  rschema: ratingSchema,
  rmodel: Rating
};
