var mongoose = require('mongoose');
var user = require('./user');
var venue = require('./venue');

console.log(user);
var EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  location : venue.schema.id, //should be primary key of desired venue
  isPrivate : Boolean,
  owner : user.schema.id, // primary key of User hat is OWNER
  cost : Number,
  maxAttending : Number,
  invited : [user.schema.id],
  attending : [user.schema.id], // primary key of every user attending
  arrived : [user.schema.id] // Stores primary key of party goers that have already arrived. 
});

module.exports = {
    schema: EventSchema,
    model: Event
};
