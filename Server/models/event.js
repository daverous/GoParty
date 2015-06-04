var mongoose = require('mongoose');
//var user = require('user');
var venue = require('venue');

var EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  location : String, //should be primary key of desired venue
  isPrivate : Boolean,
  owner : String, // primary key of User hat is OWNER
  cost : Number,
  maxAttending : Number,
  invited : [String],
  attending : [String], // primary key of every user attending
  arrived : [String] // Stores primary key of party goers that have already arrived. 
});

//