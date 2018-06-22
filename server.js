const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

var mongo = require('mongodb');
var mongoose = require('mongoose');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const  router = express.Router();


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/';


const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var db = mongoose.connection;



db.once('open',function(){
	
console.log('connected to DB')	;
	
});

db.on('error',function(err){
	
console.log('Erreur  :::  '+err);
	
});

app.listen(8080, () => {
    console.log('Server started  !!  ');
});

app.use(cors(corsOptions));

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

 

app.post("/api/search", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db("mydb");
        console.log(req.body.name);
        const query = { name: req.body.name};
        db.collection("Hotels").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json({data: result});
        });


        client.close();
    });


}); 
/*
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
});  
 

 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("Hotels", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});  


  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Hôtel Delphin Habib"};
  dbo.collection("Hotels").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});  */


//test connection for angular
connect: {
  preview: {
    options: {
      port: 9000,
      keepalive: true,
      base: './dev',
      livereload: true,
      // https://github.com/gruntjs/grunt-contrib-connect/issues/66
      middleware: function(connect, options) {
        return [function(req, res) {
          require('fs').createReadStream('dev/index.html').pipe(res);
        }]
      }
    }
  },
  optimize: {
    options: {
      port: 9001,
      keepalive: true,
      base: './production',
      // https://github.com/gruntjs/grunt-contrib-connect/issues/66
      middleware: function(connect, options) {
        return [function(req, res) {
          require('fs').createReadStream('index.html').pipe(res);
        }]
      }
    }
  }
},