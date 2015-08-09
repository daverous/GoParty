var mongoose = require('mongoose');
// var partier = require('./partier');
var venue = require('./venue');


var eventSchema = new mongoose.Schema({

  name: String,
  description: String,
  location :  mongoose.Schema.ObjectId, //should be primary key of desired venue
  isPrivate : Boolean,
  // owner : partier.schema.id, // primary key of User hat is OWNER
  cost : Number,
  maxAttending : Number
  // invited : [partier.schema.id],
  // attending : [partier.schema.id], // primary key of every user attending
  // arrived : [partier.schema.id] // Stores primary key of party goers that have already arrived. 
});

var Event = mongoose.model('Event', eventSchema);

module.exports = {
    schema: eventSchema,
    model: Event
};
