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
mongoose.connect('mongodb://localhost:27017/app',{ useNewUrlParser: true });

var db = mongoose.connection;
/**/
db.once('open',function(){

    console.log('connected to DB')	;

});

db.on('error',function(err){

    console.log(err);

});


/*

app.use('/auth/login', function (req, res, next) {
   // res.send(req.params)
   //  console.log('Time:', Date.now());

});

app.use('/auth/register', function (req, res, next) {
  //  res.send(req.params)
   // console.log('Now:', Date.now());

});
*/



app.use('/',require('./routes/api'));
app.use('/annonces',require('./routes/annonces'));
app.use('/articles',require('./routes/articles'));
app.use('/categories',require('./routes/categories'));
app.use('/users',require('./routes/users'));
app.use('/repertoires',require('./routes/repertoires'));
//app.use('/contact',require('./routes/contact'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://test7.enterpriseesolutions.com:4200");
   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(passport.initialize());



//create a cors middleware
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function(){
    console.log('Server started on port '+app.get('port'));
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

 
  

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
 
   
  
   
/*************  Pictures  *****************

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

app.listen(8880, () => {
  console.log('8880');
});


*/

module.exports = app;
