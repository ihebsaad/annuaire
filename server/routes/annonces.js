var express = require('express');
var router = express.Router();
 
var Annonce = require('../models/annonce');

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

router.get('/add',(request,response)=>{
    response.render('annonces/add',{titre:'Ajouter une Annonce',errors:null})
})

//addsubmit
router.post('/add',(request,response)=>{
    request.checkBody('titre','le titre est obligatoire').notEmpty()
    request.checkBody('details','les détails sont obligatoires').notEmpty()
     request.checkBody('auteur',"l'auteur est obligatoire").notEmpty()
   // request.checkBody('ref','ref est oblig').notEmpty()
    let errors=request.validationErrors()
    if(errors){
        response.render('add',{
            titre:'Ajouter une Annonce',
            errors:errors
        })
    }else {
        let annonce = new Annonce();
        annonce.titre = request.body.titre ;
        annonce.details = request.body.details ;
        annonce.auteur = request.body.auteur;

        annonce.save((error) => {
            if (error) throw error
            else{
      	 response.json({
					
					  result : "ajouté avec succès!"
					
				});
				}
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
//sup annonce
router.get('/delete/:id',(request,response)=>{
                console.log("suppression")        
                Annonce.findByIdAndRemove(request.params.id, (err,annonce) => {
					console.log(err);
                    response.redirect('/annonces')
                })
        

})
//Get Annonce/edit
router.get('/edit/:id',(request,response)=>{

    Annonce.findById(request.params.id,(err,annonce)=>{
        if(annonce.ref != request.user._id){
            console.log(request.user._id)
            request.flash('negative','not Authorized');
            response.redirect('/annonces');
        }else{
        response.render('edit',{annonce:annonce})}
    })

})
router.post('/edit/:id',(request,response)=>{
    let annonce={};
     annonce.titre = request.body.titre ;
        annonce.details = request.body.details ;
        annonce.auteur = request.body.auteur;

    Annonce.update({_id:request.params.id},annonce,(error)=>{
        request.flash('positive',"modifié avec succès !")
        response.redirect('/annonces')

    })
})


module.exports = router;