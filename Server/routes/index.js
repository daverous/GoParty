var express = require('express');
var router = express.Router();


module.exports = function(app, passport) {
    var dbManager = require('../js/db');
    var user = require('../models/user').model;
    var rating = require('../models/user').rmodel;
    var locArray; // 0 is Location, 1 is range, 2 is max

    // app.use('/public', express.static('./public'));


    app.get('/loc/:id', function (req, res) {
      var ids = req.params.id;
      locArray = ids.split('++');
      dbManager.getHouses(locArray, function() {
        console.log('callback ');
      });

    });

    app.get('/', function(req, res, next) {
        if (req.user) {
            req.session.userName = req.user.username;
        }
        res.render('index', {
            user: req.user
        });
    });

    app.get('/login', function(req, res, next) {
        res.render('login', {
            message: req.flash('message')
        });
    });
};

var isAuthenticated = function(req, res, next) {
    console.log("home?");
    // check if user is authenticated
    if (req.isAuthenticated()) {
        console.log('isAuthenticated');
        return next();
    }

    // if not authenticated, then redirect to login page

    res.redirect('/login');
};
