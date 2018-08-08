var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

var Article = require('../models/article');


var cors = require('cors');

var corsOptions = {

    origin: 'http://localhost:4200',
    // origin: 'http://'+window.location.hostname+':4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(expressValidator());

router.use(cors(corsOptions));

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


// JSON Format
router.post('/list/elt', function (req, res) {

    var query  =  Article.where({ _id: req.body.id });

    query.findOne(function (err, Article) {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

                  categories:categories

            }); */

            res.json({

                articles:Article

            });
        }
    });


});



router.get('/add',(request,response)=>{
    response.render('articles/add',{titre:'ADD Article',errors:null})
})

//addsubmit
router.post('/add',(request,response)=>{

    request.checkBody('title','le titre est obligatoire').notEmpty()
    request.checkBody('contenu','le contenu est obligatoire').notEmpty()
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
        let article = new Article();
        article.title = request.body.title ;
        article.contenu = request.body.contenu ;
        article.auteur = request.body.auteur ;

        article.save((error) => {
            if (error) throw error
            else

                response.json({

                    result : "ajouté avec succès!"

                });

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
    console.log("suppression")
    Article.findByIdAndRemove(request.params.id, (err,article) => {
        console.log(err);
        response.json({

            result : "successfully deleted !"

        });
    })


})

router.post('/edit/:id',(request,response)=>{


    Article.findById(request.params.id,(err,article)=>{
        if(article.ref != request.body._id){
            console.log(request.body._id)
        }else{

      
            if(request.body.title != null)
                article.title = request.body.title ;
            if(request.body.contenu != null)
                article.contenu = request.body.contenu ; 
			if(request.body.auteur != null)
                article.auteur = request.body.auteur ;
           
            Article.update({_id:request.params.id},article,(error)=>{
                response.json({

                    result : "success to update the article !"

                });

            })


        }
    })

})


router.post('/search',(request,response)=>{

    var query  =  Article.where({ titre: request.body.titre });

    query.findOne(function (err, Article) {
        if (err){console.log(err);}
        else{
   

            response.json({

                articles:Article

            });
        }
    });

})

/*
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

*/
module.exports = router;