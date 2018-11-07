var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var bodyParser  = require('body-parser');

var cors = require('cors');

var corsOptions = {
	
    origin: 'http://localhost:4200',
  //  origin: 'http://'+window.location.hostname+':4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(cors(corsOptions));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.post('/test2', function(req, res) {
    res.send('this is a sample!');  
});

router.post('/auth/login', function(req, res) {
    res.send(res);  

});
router.post('/auth/register', function(req, res) {

});
router.post('/profile', function(req, res) {

});
router.post('/interest', function(req, res) {

});


router.post('/signup', function(req, res) {
    if (!req.body.email || !req.body.password ||!req.body.fullName) {
        res.json({success: false, msg: 'Please pass email and password.'});
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'email already exists.'});
            }
            var token = jwt.sign(newUser.toJSON(), config.secret);
            // return the information including token as JSON
            res.json({token: 'JWT ' + token});
        });
    }
});


router.post('/signin', function(req, res) {

    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                 
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});


getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};



module.exports = router;