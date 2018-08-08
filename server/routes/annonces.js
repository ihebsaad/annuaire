var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

var Annonce = require('../models/annonce');

var cors = require('cors');

var corsOptions = {

    origin: 'http://localhost:4200',
    // origin: 'http://'+window.location.hostname+':4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(expressValidator());

router.use(cors(corsOptions));

// Get List Annonces
router.get('/', function (req, res) {
	Annonce.find({}, function (err, annonces)
		{
			if (err){console.log(err);}
			else{
				res.render('annonces/annonces',{
					
					  annonces:annonces
					
				});
			}
			
			
		});
 
});



 // JSON Format
router.get('/list', function (req, res) {
	Annonce.find({}, function (err, annonces)
		{
			if (err){console.log(err);}
			else{
				res.json({
					
					  annonces:annonces
					
				});
			}
			
			
		});
 
});


// JSON Format Elt
router.post('/list/elt', function (req, res) {

    var query  =  Annonce.where({ _id: req.body.id });

    query.findOne(function (err, Annonce) {
        if (err){console.log(err);}
        else{
        

            res.json({

                annonces:Annonce

            });
        }
    });


});

router.get('/add',(request,response)=>{
    response.render('annonces/add',{titre:'Ajouter une Annonce',errors:null})
})

//addsubmit
router.post('/add',(request,response)=>{

    request.checkBody('titre','le titre est obligatoire').notEmpty()
    request.checkBody('details','le details est obligatoire').notEmpty()
    request.checkBody('auteur','l auteur est obligatoire').notEmpty()
     // request.checkBody('ref','ref est oblig').notEmpty()
    let errors=request.validationErrors()
    if(errors){
        /* response.render('add',{
             titre:'Ajouter un Répertoire',
             errors:errors
         }) */
        response.json({

            result : "failed to add  !"

        });
    }else {
        let annonce = new Annonce();
        annonce.titre = request.body.titre ;
        annonce.details = request.body.details ;
        annonce.auteur = request.body.auteur ;

        annonce.save((error) => {
            if (error) throw error
            else

                response.json({

                    result : "ajouté avec succès!"

                });

        })

    }

})


//get annonce
router.get('/:id',(request,response)=>{

    Annonce.findById(request.params.id,(err,annonce)=>{
        console.log(request.params.id);
        response.render('annonces/edit',{
            annonce:annonce//,
            //  name: user.name
        })

    })

})

//sup categorie
router.get('/delete/:id',(request,response)=>{
    console.log("suppression")
    Annonce.findByIdAndRemove(request.params.id, (err,annonce) => {
     //   console.log(err);
        response.json({

            result : "successfully deleted !"

        });
    })


})

router.post('/edit/:id',(request,response)=>{


    Annonce.findById(request.params.id,(err,annonce)=>{
        if(annonce.ref != request.body._id){
            console.log(request.body._id)
        }else{

      
            if(request.body.titre != null)
                annonce.titre = request.body.titre ;
            if(request.body.details != null)
                annonce.details = request.body.details ; 
			if(request.body.auteur != null)
                annonce.auteur = request.body.auteur ;
           
            Annonce.update({_id:request.params.id},annonce,(error)=>{
                response.json({

                    result : "success to update the annonce !"

                });

            })


        }
    })

})


router.post('/search',(request,response)=>{

    var query  =  Annonce.where({ titre: request.body.titre });

    query.findOne(function (err, Annonce) {
        if (err){console.log(err);}
        else{
   

            response.json({

                annonces:Annonce

            });
        }
    });

})


module.exports = router;