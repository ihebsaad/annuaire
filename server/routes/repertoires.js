var express = require('express');
var router = express.Router();
const cors = require('cors');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
 
var Repertoire = require('../models/repertoire');

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
                    response.redirect('/repertoires')
                })
        

})
//Get Repertoire/edit
router.get('/edit/:id',(request,response)=>{

    Repertoire.findById(request.params.id,(err,repertoire)=>{
        if(repertoire.ref != request.user._id){
            console.log(request.user._id)
            request.flash('negative','not Authorized');
            response.redirect('/repertoires');
        }else{
        response.render('edit',{repertoire:repertoire})}
    })

})
router.post('/edit/:id',(request,response)=>{
    let repertoire={};
     repertoire.titre = request.body.titre ;
        repertoire.tel = request.body.tel ;
        repertoire.categorie = request.body.categorie ;
        repertoire.ville = request.body.ville ;
        repertoire.adresse = request.body.adresse ;
        repertoire.auteur = request.body.auteur;

    Repertoire.update({_id:request.params.id},repertoire,(error)=>{
        request.flash('positive',"modifié avec succès !")
        response.redirect('/repertoires')

    })
})


module.exports = router;