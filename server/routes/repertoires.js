var express = require('express');
var router = express.Router();
var Repertoire = require('../models/repertoire');
var expressValidator = require('express-validator');

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


module.exports = router;