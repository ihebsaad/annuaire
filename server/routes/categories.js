var express = require('express');
var router = express.Router();
 
var Categorie = require('../models/categorie');
 
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
				res.json({
					
					  categories:categories
					
				});
			}
			
			
		});
 
});


router.get('/add',(request,response)=>{
    response.render('categories/add',{titre:'Ajouter une Catégorie',errors:null})
})

//addsubmit
router.post('/add',(request,response)=>{
    request.checkBody('titre','le titre est obligatoire').notEmpty()
    request.checkBody('type',"le type est obligatoire").notEmpty()
   // request.checkBody('ref','ref est oblig').notEmpty()
    let errors=request.validationErrors()
    if(errors){
	 response.json({
					
					  result : "failed to add the Category !"
						
				});
    }else {
        let categorie = new Categorie();
        categorie.titre = request.body.titre ;
        categorie.type = request.body.type ;

		

        categorie.save((error) => {
            if (error) throw error
            else
          /*      request.flash('positive', "ajouté avec succès!")
            response.redirect('/categories')
*/
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
                    if (err) console.log('error'+err);
            else
					
                         response.json({ result : "supprimé avec succès!"});
                })
        

})
//Get Categorie/edit
router.get('/edit/:id',(request,response)=>{

    Categorie.findById(request.params.id,(err,categorie)=>{
        if(categorie.ref != request.user._id){
            console.log(request.user._id)
            //request.flash('negative','not Authorized');
           // response.redirect('/categories');
        }else{
     //   response.render('edit',{categorie:categorie})}
              response.json({ result : "modifié avec succès!"});
                  }

})
})
router.post('/edit/:id',(request,response)=>{
    let categorie={};
     categorie.titre = request.body.titre ;
        categorie.type = request.body.type ;
 

    Categorie.update({_id:request.params.id},categorie,(error)=>{
                          if (error) console.log('error'+error);
            else
                    
                         response.json({ result : "modifié avec succès!"});
                })
    });



module.exports = router;