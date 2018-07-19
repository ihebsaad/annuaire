var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var expressValidator = require('express-validator');
var nodemailer = require("nodemailer");

var api = express.Router();
var debug = require('debug')('auth:server');
var http = require('http');


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


app.use('/',require('./routes/api'));
app.use('/annonces',require('./routes/annonces'));
app.use('/articles',require('./routes/articles'));
app.use('/categories',require('./routes/categories'));
app.use('/repertoires',require('./routes/repertoires'));
//app.use('/contact',require('./routes/contact'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(passport.initialize());

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

 // ***** Send Mail *****    //
 app.post('/contact/send', function(req, res){
console.log('here we go from app.js');
 console.log(req.body.email);
 let sender=req.body.email;
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
/*    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });*/

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saadrania92@gmail.com',
    pass: 'mypw'
  }
});

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"From Ran 👻" '+sender, // sender address
        to: 'ing.raniasaad@gmail.com',
                subject: 'Hello ✔'+req.body.name, // Subject line
        text: req.body.description, // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error from send mail');
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
});



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
 


module.exports = app;
