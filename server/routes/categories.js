var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator'); 
var Categorie = require('../models/categorie');
 
var cors = require('cors');

var corsOptions = {
  
    origin: 'http://localhost:4200',
   // origin: 'http://'+window.location.hostname+':4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(expressValidator());

router.use(cors(corsOptions));

// Get List Categories
router.get('/', function (req, res) {
    Categorie.find({}, function (err, categories)
    {
        if (err){console.log(err);}
        else{
            res.render('categories/categories',{

                categories:categories

            });
        }


    });

});


// JSON Format
router.get('/list', function (req, res) {
    Categorie.find({}, function (err, categories)
    {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

                  categories:categories

            }); */

            res.json({

                categories:categories

            });
        }

    });

});



// JSON Format
router.post('/list/elt', function (req, res) {

    var query  =  Categorie.where({ _id: req.body.id });

    query.findOne(function (err, Categorie) {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

                  categories:categories

            }); */

            res.json({

                categories:Categorie

            });
        }
    });


});


router.get('/add',(request,response)=>{


    response.render('categories/add',{titre:'Ajouter une catégorie' , errors:null})


})

//addsubmit
router.post('/add',(request,response)=>{

    request.checkBody('titre','le titre est obligatoire').notEmpty()
    request.checkBody('type','le type est obligatoire').notEmpty()
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
        let categorie = new Categorie();
        categorie.titre = request.body.titre ;
        categorie.type = request.body.type ;
        categorie.parent = request.body.parent ;

        categorie.save((error) => {
            if (error) throw error
            else
            /* request.flash('positive', "ajouté avec succès!")
             response.redirect('/categories') */
                response.json({

                    result : "ajouté avec succès!"

                });

        })

    }

})


//get categorie
router.get('/:id',(request,response)=>{

    Categorie.findById(request.params.id,(err,categorie)=>{
        console.log(request.params.id);
        response.render('categories/edit',{
            categorie:categorie//,
            //  name: user.name
        })

    })

})
//sup categorie
router.get('/delete/:id',(request,response)=>{
    console.log("suppression")
    Categorie.findByIdAndRemove(request.params.id, (err,categorie) => {
        console.log(err);
        response.json({

            result : "successfully deleted !"

        });
    })


})

router.post('/edit/:id',(request,response)=>{


    Categorie.findById(request.params.id,(err,categorie)=>{
        if(categorie.ref != request.body._id){
            console.log(request.body._id)
        }else{

            // let categorie = new Categorie();
            //let categorie= {};
            if(request.body.titre != null)
                categorie.titre = request.body.titre ;
            if(request.body.type != null)
                categorie.type = request.body.type ;
            if(request.body.parent != null)
                categorie.parent = request.body.parent ;
           
            Categorie.update({_id:request.params.id},categorie,(error)=>{
                response.json({

                    result : "success to update the catgory !"

                });

            })


        }
    })

})


router.post('/search',(request,response)=>{

    var query  =  Categorie.where({ titre: request.body.titre });

    query.findOne(function (err, Categorie) {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

                  categories:categories

            }); */

            response.json({

                categories:Categorie

            });
        }
    });

})






module.exports = router;