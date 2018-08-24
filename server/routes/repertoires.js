var express = require('express');
var router = express.Router();
var Repertoire = require('../models/repertoire');
var expressValidator = require('express-validator');
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo


var cors = require('cors');

var corsOptions = {
	
    origin: 'http://localhost:4200',
   // origin: 'http://'+window.location.hostname+':4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(expressValidator());

router.use(cors(corsOptions));

// Get List Repertoires
router.get('/', function (req, res) {
    Repertoire.find({}, function (err, repertoires)
    {
        if (err){console.log(err);}
        else{
            res.render('repertoires/repertoires',{

                repertoires:repertoires

            });
        }


    });

});


// JSON Format
router.get('/list', function (req, res) {
    Repertoire.find({}, function (err, repertoires)
    {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

                  repertoires:repertoires

            }); */

            res.json({

                repertoires:repertoires

            });
        }

    });

});



// JSON Format
router.post('/list/elt', function (req, res) {

    var query  =  Repertoire.where({ _id: req.body.id });

    query.findOne(function (err, Repertoire) {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

                  repertoires:repertoires

            }); */

            res.json({

                repertoires:Repertoire

            });
        }
    });


});


router.get('/add',(request,response)=>{


    response.render('repertoires/add',{titre:'Ajouter un Répertoire' , errors:null})


})

//addsubmit
router.post('/add',(request,response)=>{

    request.checkBody('titre','le titre est obligatoire').notEmpty()
    request.checkBody('ville','la ville est obligatoire').notEmpty()
    request.checkBody('adresse',"l'adresse est obligatoire").notEmpty()
    request.checkBody('categorie',"la catégories est obligatoire").notEmpty()
    // request.checkBody('ref','ref est oblig').notEmpty()
    let errors=request.validationErrors()
    if(errors){
        /* response.render('add',{
             titre:'Ajouter un Répertoire',
             errors:errors
         }) */
        response.json({

            result : "failed to add the directory !"

        });
    }else {
        let repertoire = new Repertoire();
        repertoire.titre = request.body.titre ;
        repertoire.tel = request.body.tel ;
        repertoire.categorie = request.body.categorie ;
        repertoire.ville = request.body.ville ;
        repertoire.adresse = request.body.adresse ;
          repertoire.auteur = request.body.auteur;
  repertoire.image = request.body.image;

        repertoire.auteur = request.body.auteur;




        repertoire.save((error) => {
            if (error) throw error
            else
            /* request.flash('positive', "ajouté avec succès!")
             response.redirect('/repertoires') */
                response.json({

                    result : "ajouté avec succès!"

                });

        })

    }

})
//upload image
/*console.log('entred to uplod express');
var fname="";
var path = '';
//var upload = multer({dest: DIR}).single(req.file.filename);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
     fname=file.fieldname;
  }
})*/
/*var upload = multer({storage: storage}).single('photo');
router.post('/upload', function (req, res, next) {
 //   console.log( req.params.name);
 //   console.log(req);
//var upload = multer({ storage: storage })
    upload(req, res, function (err) {
//console.log( request.params.name);
        if (err) {
            console.log('here');
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured while uploading")
        }  
       // No error occured.
        path = req.file.path;

        res.json({

                    path :path
                });

        //return res.send("Upload Completed for "+path); 
  });    
  });
*/
//test
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
   // crypto.pseudoRandomBytes(16, function (err, raw) {
     // cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    cb(null, path.parse(file.originalname).name + path.extname(file.originalname)) //Appending extension
   console.log(file.originalname);

 }
  
});
var upload = multer({ storage: storage }).any();
router.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.log('here');
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured while uploading")
        }  
       // No error occured.
       console.log('no error');
       return res.send("Upload Completed  ");   });    
  });


//get repertoire
router.get('/:id',(request,response)=>{

    Repertoire.findById(request.params.id,(err,repertoire)=>{
        console.log(request.params.id);
        response.render('repertoires/edit',{
            repertoire:repertoire//,
            //  name: user.name
        })

    })

})
//sup repertoire
router.get('/delete/:id',(request,response)=>{
    console.log("suppression")
    Repertoire.findByIdAndRemove(request.params.id, (err,repertoire) => {
        console.log(err);
        response.json({

            result : "successfully deleted !"

        });
    })


})

router.post('/edit/:id',(request,response)=>{


    Repertoire.findById(request.params.id,(err,repertoire)=>{
        if(repertoire.ref != request.body._id){
            console.log(request.body._id)
        }else{

            // let repertoire = new Repertoire();
            //let repertoire= {};
            if(request.body.titre != null)
                repertoire.titre = request.body.titre ;
            if(request.body.tel != null)
                repertoire.tel = request.body.tel ;
            if(request.body.categorie != null)
                repertoire.categorie = request.body.categorie ;
            if(request.body.ville != null)
                repertoire.ville = request.body.ville ;
            if(request.body.adresse != null)
                repertoire.adresse = request.body.adresse ;
            if(request.body.auteur != null)
                repertoire.auteur = request.body.auteur;

            Repertoire.update({_id:request.params.id},repertoire,(error)=>{
                response.json({

                    result : "success to update the directory !"

                });

            })


        }
    })

})

router.post('/approve/:id',(request,response)=>{


    Repertoire.findById(request.params.id,(err,repertoire)=>{
        if(repertoire.ref != request.body._id){
            console.log(request.body._id)
        }else{

            // let repertoire = new Repertoire();
            //let repertoire= {};
           
                repertoire.status = 'approuvé';

            Repertoire.update({_id:request.params.id},repertoire,(error)=>{
                response.json({

                    result : "success to update the directory !"

                });

            })


        }
    })

})


router.post('/search',(request,response)=>{

    var query  =  Repertoire.where({ titre: request.body.titre });

    query.findOne(function (err, Repertoire) {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

                  repertoires:repertoires

            }); */

            response.json({

                repertoires:Repertoire

            });
        }
    });

})


router.get('/searchpercateg/:titresel',(request,response)=>{
console.log('here');
console.log('titre'+request.params.titresel);
    var query  =  Repertoire.where({ categorie: request.params.titresel });

    query.find(function (err, Repertoire) {
        if (err){console.log(err);}
        else{
console.log(Repertoire);
            /* res.status(400).json({

                  repertoires:repertoires

            });*/
                        response.json({

                repertoires:Repertoire

            });
        }
    });

  /*  Repertoire.find({}, function (err, repertoires)
    {
        if (err){console.log(err);}
        else{
            res.render('repertoires/repertoires',{

                repertoires:repertoires

            });
        }
*/

    });

//get total directories
router.post('/count',(request,response)=>{
    console.log('entred to count');
    Repertoire.count({}, function(err, c) {
           console.log('Count is ' + c);
       response.json({
                count:c
            });
})
});
//get total directories
router.post('/counta',(request,response)=>{
    console.log('entred to count');
    Repertoire.count({status: 'approuvé'}, function(err, c) {
           console.log('Count is ' + c);
       response.json({
                count:c
            });
})
});
//get total directories
router.post('/countn',(request,response)=>{
    console.log('entred to count');
    Repertoire.count({status: 'non approuvé'}, function(err, c) {
           console.log('Count is ' + c);
       response.json({
                count:c
            });
})
});
//get total directories per categories
router.get('/countpercat/:cat',(request,response)=>{
    console.log('entred to count per cat ' +request.params.cat);
    Repertoire.count({categorie: request.params.cat}, function(err, c) {
           console.log('Count per cat is ' + c);
       response.json({
                count:c
            });
});
});



router.post('/note',(request,response)=>{
Repertoire.aggregate(
   [
     { $project: {
    //_id:0,
    noteavg: { $divide: [ "$note", "$nbVote" ] } } }
   ]
, function(err, n) {
           console.log( n);
       response.json({
                notes:n
            });

});
});

module.exports = router;