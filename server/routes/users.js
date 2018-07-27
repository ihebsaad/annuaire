var express = require('express');
var router = express.Router();
var Repertoire = require('../models/repertoire');
var expressValidator = require('express-validator');

var User = require('../models/user');
var cors = require('cors');

var corsOptions = {
    
    origin: 'http://localhost:4200',
   // origin: 'http://'+window.location.hostname+':4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(expressValidator());

router.use(cors(corsOptions));



router.get('/access/:email', function(req, res) {

 //  let  email=localStorage.getItem('email');
   let email= req.params.email;  
if (email.length == 0)
{
    let loggedin=false;
}
else {
    let loggedin=true;
    console.log('loggedin');
}
let st="";
User.findOne({
        email: email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          res.json({

            result : "simple0"        });
        } 
         else{ 
   res.json({

            result : user.status
        });
         }


     // console.log('test');
     

    });



})



module.exports = router;