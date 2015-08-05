/* global bcrypt */
var mongoose = require('mongoose');
var event = require('./event');

console.log("here" + event);

var ratingSchema = new mongoose.Schema({
    rated_friend: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    notAttendingRating: {
        type: Number // flake points
    },
    rating: {
        type: Number // Percentage of yes no, how was your night. The host has overview of everyone who attended, and thumbs up, thumbs down.
        // bad ratings need reason
        
       
    }
});
 // scan users on entry. 
var userSchema = new mongoose.Schema({
    _id : Number,
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    firstName: String,
    lastName: String,
    email: String, // required correspondance.
    username: String,
    password: String,
    joined: {
        type: Date, default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
    evaluations: {
        type: Number,
        default: 0
    },
    // Events that the user has agreed to. 
    events : [{
        _id: {type : event.schema.ObjectId}
    }],
    
    _friends: [{
        _id: { type: mongoose.Schema.ObjectId, ref: 'User' },
        firstName : { type: String, ref: 'User'},
        lastName : { type: String, ref: 'User'},
        email: { type: String, ref: 'User'},
        username: { type: String, ref: 'User'},
        rating: {type: Number, default: 0, ref: 'User'},
        evaluations: {type: Number, default: 0, ref: 'User'}
    }],
    _ratings: [ratingSchema],
    role: {
        type: Number,
        default: 0
    },
});

userSchema.statics.list = function (callback) {
    this.find({deleted : false}, function (err, users) {
        if (err) {
            return (err, null);
        } else {
            callback(null, users);
        }
    });
};

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

var User = mongoose.model('User', userSchema);
var Rating = mongoose.model('Rating', ratingSchema);

module.exports = {
    schema: userSchema,
    model: User,
    rschema: ratingSchema,
    rmodel: Rating
};
