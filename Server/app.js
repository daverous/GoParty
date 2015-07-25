var express = require('express');
var path = require('path');
var logger = require('morgan');
var authenticate = require('./js/auth');
var passport = require('passport');
var bodyParser = require('body-parser');
var express_session = require('express-session');
var mongoose = require('mongoose');
var settings = require('./js/settings');
var Cookies = require("cookies");
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var favicon = require('serve-favicon');

// mongoose.connect("mongodb://localhost/test");
var config = {
    APP_ID: process.env.APP_ID || settings.APP_ID,
    APP_SECRET: process.env.APP_SECRET || settings.APP_SECRET,
    APP_URL: process.env.APP_URL || settings.APP_URL,
    SCOPE: '',
    SECRET: process.env.SECRET || settings.SECRET,
    PORT: process.env.PORT || 3000
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express_session({
//   secret: 'top_secret_key'
// }));

// store and display messages in templates
app.use(flash());

// initialize and start passport session for authentication
app.use(passport.initialize());
app.use(passport.session());

// adding user-authentication code
authenticate(passport);

require('./routes/index.js')(app, passport);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

app.listen(config.PORT, function() {
    console.log('Express server running on port ' + config.PORT);
});

