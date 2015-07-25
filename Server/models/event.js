var mongoose = require('mongoose');
var UserSchema = require('./user').schema;
var venue = require('./venue');

var EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  location : venue.schema.id, //should be primary key of desired venue
  isPrivate : Boolean,
  owner : UserSchema._id, // primary key of User hat is OWNER
  cost : Number,
  maxAttending : Number,
  invited : [UserSchema._id],
  attending : [UserSchema._id], // primary key of every user attending
  arrived : [UserSchema._id] // Stores primary key of party goers that have already arrived. 
});

module.exports = {
    schema: EventSchema,
    model: Event
};
//