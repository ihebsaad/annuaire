var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var expressValidator = require('express-validator');
var nodemailer = require("nodemailer");
var fs = require('fs');  

var router = express.Router();
var debug = require('debug')('auth:server');
var http = require('http');

var multer = require('multer');
var app = express();
app.use(expressValidator());
//mongoose.connect(config.database);

   
 /*************  Pictures  *****************/

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const fileUpload = require('express-fileupload');
const cors = require('cors');


// view engine setup
app.set('uploads', path.join(__dirname, 'uploads'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/uploads', express.static(__dirname + '/uploads'));
//app.use('/uploads',express.static('uploads'));

app.post('/upload', (req, res, next) => {
    console.log(req);
    let imageFile = req.files.file;

    imageFile.mv(`${__dirname}/uploads/${req.body.filename}.jpg`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({file: `uploads/${req.body.filename}.jpg`});
    });

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8888, () => {
    console.log('8888');
});


module.exports = app;
