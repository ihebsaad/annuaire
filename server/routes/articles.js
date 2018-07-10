var express = require('express');
var router = express.Router();
 
var Article = require('../models/article');

// Get List Articles
router.get('/', function (req, res) {
	Article.find({}, function (err, articles)
		{
			if (err){console.log(err);}
			else{
				res.render('articles/articles',{
					  articles:articles
				});
			}
		});
});

 // JSON Format
router.get('/list', function (req, res) {
	Article.find({}, function (err, articles)
		{
			if (err){console.log(err);}
			else{
				res.json({
					
					  articles:articles
					
				});
			}
			
			
		});
 
});


router.get('/add',(request,response)=>{
    response.render('articles/add',{titre:'ADD Article',errors:null})
})

//addsubmit
router.post('/add',(request,response)=>{
    request.checkBody('titre','titre est obligatoire').notEmpty()
   // request.checkBody('ref','ref est oblig').notEmpty()
    let errors=request.validationErrors()
    if(errors){
        response.render('add',{
            titre:'ADD Article',
            errors:errors
        })
    }else {
        let article = new Article();
        article.title = request.body.titre ;
        article.contenu = request.body.contenu ;
        article.auteur = request.body.auteur;

        article.save((error) => {
            if (error) throw error
      else{
      	 response.json({
					
					  result : "ajouté avec succès!"
					
				});
				}

        })

    }
})


//get article
router.get('/:id',(request,response)=>{

    Article.findById(request.params.id,(err,article)=>{
			console.log(request.params.id);
             response.render('articles/edit',{
                article:article//,
              //  name: user.name
            })
 
    })

})
//sup article
router.get('/delete/:id',(request,response)=>{
                console.log("ggg")        
                Article.findByIdAndRemove(request.params.id, (err,article) => {
					console.log(err);
                    response.redirect('/articles')
                })
        

})
//Get Article/edit
router.get('/edit/:id',(request,response)=>{

    Article.findById(request.params.id,(err,article)=>{
        if(article.ref != request.user._id){
            console.log(request.user._id)
            request.flash('negative','not Authorized');
            response.redirect('/');
        }else{
        response.render('edit',{article:article})}
    })

})
router.post('/edit/:id',(request,response)=>{
    let article={};
    article.title=request.body.titre
    article.ref=request.body.ref

    Article.update({_id:request.params.id},article,(error)=>{
        request.flash('positive',"modifier!")
        response.redirect('/')

    })
})


module.exports = router;