var express = require('express');
var router = express.Router();
var Repertoire = require('../models/repertoire');
var expressValidator = require('express-validator');
var nodemailer = require("nodemailer");

var User = require('../models/user');
var cors = require('cors');


var corsOptions = {

    origin: 'http://localhost:4200',
    // origin: 'http://'+window.location.hostname+':4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(expressValidator());

router.use(cors(corsOptions));

// sample route with a route the way we're used to seeing it
router.get('/test', function(req, res) {
    res.send('this is a sample!');  
});


router.get('/auth/register',(request,response)=>{
});


router.get('/auth/login',(request,response)=>{
});

router.get('/pofile',(request,response)=>{
});

router.get('/interest',(request,response)=>{
});






// Get List Users
router.get('/', function (req, res) {
    User.find({}, function (err, users)
    {
        if (err){console.log(err);}
        else{
            res.render('users/users',{

                users:users

            });
        }


    });

});


// JSON Format
router.get('/list', function (req, res) {
    User.find({}, function (err, users)
    {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

             users:users

             }); */

            res.json({

                users:users

            });
        }

    });

});



// JSON Format
router.post('/list/elt', function (req, res) {

    var query  =  User.where({ _id: req.body.id });

    query.findOne(function (err, User) {
        if (err){console.log(err);}
        else{
            /* res.status(400).json({

             users:users

             }); */

            res.json({

                users:User

            });
        }
    });


});


router.get('/add',(request,response)=>{


    response.render('users/add',{titre:'Ajouter un utilisateur' , errors:null})


})

//addsubmit
router.post('/add',(request,response)=>{
	console.log('Adding the user');

    request.checkBody('fullName','le nom est obligatoire').notEmpty()
    request.checkBody('email','l  email est obligatoire').notEmpty()
    request.checkBody('status','le status est obligatoire').notEmpty()
   // request.checkBody('company','entreprise obligatoire').notEmpty()
    // request.checkBody('ref','ref est oblig').notEmpty()
  /*  let errors=request.validationErrors()
    if(errors){

	
        response.json({

            result : "failed to add  !"

        });
			console.log('erreur : '+errors);

    }else {*/
        let user = new User();
        user.fullName = request.body.fullName ;
        user.email = request.body.email ;
        user.status = request.body.status ;
        user.password = request.body.password ;
         user.company = request.body.company ;
         user.cat1 = request.body.cat1 ;
         user.cat2 = request.body.cat2 ;
         user.cat3 = request.body.cat3 ;
         user.cat4 = request.body.cat4 ;
         user.cat5 = request.body.cat5 ;
         user.cat6 = request.body.cat6 ;
         user.cat7 = request.body.cat7 ;
         user.cat8 = request.body.cat8 ;

        user.save((error) => {
			 console.log(' ajout utilisateur ..');

            if (error) {
				//throw error
				console.log('erreur ajout'+error);
			}
            else
			 console.log(' ajout with no erros');

            /* request.flash('positive', "ajouté avec succès!")
             response.redirect('/users') */
                response.json({

                    result : "ajouté avec succès!"

                });

        })

    /*}*/

})


//get user
router.get('/:id',(request,response)=>{

    User.findById(request.params.id,(err,user)=>{
        console.log(request.params.id);
        response.render('users/edit',{
            user:user//,
            //  name: user.name
        })

    })

})
//sup user
router.get('/delete/:id',(request,response)=>{
    console.log("suppression")
    User.findByIdAndRemove(request.params.id, (err,user) => {
        console.log(err);
        response.json({

            result : "successfully deleted !"

        });
    })


})


router.get('/username/:email', function(req, res) {

    //  let  email=localStorage.getItem('email');
    let email= req.params.email;

    let st="";
    User.findOne({
        email: email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({

                result : ""        });
        }
        else{
            res.json({

                result : user.fullName
            });
        }


        // console.log('test');


    });



})
router.get('/access/:email', function(req, res) {

    //  let  email=localStorage.getItem('email');
    let email= req.params.email;
   /* if (email.length == 0)
    {
        let loggedin=false;
    }
    else {
        let loggedin=true;
        console.log('loggedin');
    }*/
    let st="";
    User.findOne({
        email: email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({

                result : "simple0"        });
        }
        else{
            res.json({

                result : user.status
            });
        }


        // console.log('test');


    });



})

router.post('/edit/:id',(request,response)=>{


    User.findById(request.params.id,(err,user)=>{
        if(user.ref != request.body._id){
            console.log(request.body._id)
        }else{

            // let user = new User();
            //let user= {};
            if(request.body.fullName != null)
                user.fullName = request.body.fullName ;
            if(request.body.email != null)
                user.email = request.body.email ;
            if(request.body.status != null)
                user.status = request.body.status ;
			if(request.body.company != null)
                user.company = request.body.company ;
			if(request.body.cat1 != null)
                user.cat1 = request.body.cat1 ;
			if(request.body.cat2 != null)
                user.cat2 = request.body.cat2 ;
			if(request.body.cat3 != null)
                user.cat3 = request.body.cat3 ;
			if(request.body.cat4 != null)
                user.cat4 = request.body.cat4 ;
			if(request.body.cat5 != null)
                user.cat5 = request.body.cat5 ;
			if(request.body.cat6 != null)
                user.cat6 = request.body.cat6 ;
			if(request.body.cat7 != null)
                user.cat7 = request.body.cat7 ;
			if(request.body.cat8 != null)
                user.cat8 = request.body.cat8 ;

            User.update({_id:request.params.id},user,(error)=>{
                response.json({

                    result : "success to update the user !"

                });

            })


        }
    })

})

// JSON Format
router.post('/admin/', function (req, res) {

    let email= req.params.email;

    User.findOne({
        email: email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({

                result : "user not found" });
        }
        else{
            res.json({

                result : user.status
            });
        }


        // console.log('test');


    });


});


router.post('/changeentreprise/:email/:entreprise',(request,response)=>{

console.log('Email : '+request.params.email);
    User.findOne({ email: request.params.email},(err,user)=>{
    if (err){console.log('erreur : '+err);}
	
		    let Company = request.params.entreprise;
				user.company = Company ; 
 console.log('company : '+request.params.entreprise);

            User.update({email:request.params.email},user,(error)=>{
                response.json({

                    result : "success to update the user !"

                });
            console.log('success to update the user');

            })

        
    })

});


router.post('/change/:email/:type',(request,response)=>{

console.log('Email : '+request.params.email);
    User.findOne({ email: request.params.email},(err,user)=>{
    if (err){console.log('erreur : '+err);}
	
		    let Type= request.params.type;
				user.account = Type ; 
 
            User.update({email:request.params.email},user,(error)=>{
                response.json({

                    result : "success to update the user !"

                });
            console.log('success to update the user');

            })

        
    })

});

 

router.post('/changecat/:email/:nbr/:val',(request,response)=>{

console.log('Email : '+request.params.email);
    User.findOne({ email: request.params.email},(err,user)=>{
    if (err){console.log('erreur : '+err);}
	
	let Nbr =request.params.nbr;
	console.log('Categorie : '+Nbr);
	let Val =request.params.val;
	   	console.log('Valeur : '+Val);


	if (Nbr==1)
	{ 		
            user.cat1 = Val; 
 
	}
	if (Nbr==2)
	{ 		
             user.cat2 = Val; 

	}
	if (Nbr==3)
	{ 		
             user.cat3 = Val; 
	}
	if (Nbr==4)
	{ 		
             user.cat4 = Val; 

	}
	if (Nbr==5)
	{ 		
             user.cat5 = Val; 
	}
	if (Nbr==6)
	{ 		
             user.cat6 = Val; 

	}
	if (Nbr==7)
	{ 		
             user.cat7 = Val; 

	}
	if (Nbr==8)
	{ 		
             user.cat2 = Val; 

	}	
            User.update({email:request.params.email},user,(error)=>{
                response.json({
                    result : "success to update the user cat !"
                });
            console.log('success to update the user cat');
            })	
 
     
});

    });
 

 
 // 'use strict';
router.post('/contact/:email/:name',(request,response)=>{

  console.log('sending Email ... : ');

     let email= request.params.email;
     let name= request.params.name;
console.log('Email : '+email);
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ihebs001@gmail.com', // generated ethereal user
            pass: 'ihebssss' // generated ethereal password
        }
    });
 
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"IBO " <ihebs001@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Bienvenue à IBO ', // Subject line
       // text: 'Hello '+name+'', // plain text body
        html: 'Bonjour <b> '+name+' </b> <br> Merci pour votre insription. <br> Votre compte est activé avec succès.' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
       // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
 
 

	// Send Admin Email
	    // setup email data with unicode symbols
    let mailOptions2 = {
        from: '"IBO " <ihebs001@gmail.com>', // sender address
        to: 'saadiheb@gmail.com', // list of receivers //admins email
        subject: 'IBO - Nouvelle inscription ', // Subject line
       // text: 'Hello world?', // plain text body
        html: 'Bonjour,<br>Nouvelle inscription dans le site IBO. <br>Nom: <b> '+name+' </b><br>Email: <b> '+email+' </b>' // html body
    };
	
	    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to admin : %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });

});
 
 });
 	
	
	
	
	
	
	
	
	
	
	

/**********************  Users Management  **************************/

// Get List Users
router.get('/', function (req, res) {
	User.find({}, function (err, users)
		{
			if (err){console.log(err);}
			else{
				res.render('users/users',{
					
					  users:users
					
				});
			}
			 
		});
 
});

router.get('/add',(request,response)=>{
    response.render('users/add',{titre:'Ajouter un Utilisateur',errors:null})
})
/*
//addsubmit
router.post('/add',(request,response)=>{
    request.checkBody('nom','le titre est obligatoire').notEmpty()
    request.checkBody('prenom','la ville est obligatoire').notEmpty()
    request.checkBody('adresse',"l'adresse est obligatoire").notEmpty()
    request.checkBody('categorie',"la catégories est obligatoire").notEmpty()
   // request.checkBody('ref','ref est oblig').notEmpty()
    let errors=request.validationErrors()
    if(errors){
        response.render('add',{
            titre:'Ajouter un Utilisateur',
            errors:errors
        })
    }else {
        let user = new User();
        user.titre = request.body.titre ;
        user.tel = request.body.tel ;
        user.categorie = request.body.categorie ;
        user.ville = request.body.ville ;
        user.adresse = request.body.adresse ;
        user.auteur = request.body.auteur;

        user.save((error) => {
            if (error) throw error
            else
                request.flash('positive', "ajouté avec succès!")
            response.redirect('/users')

        })

    }
})

*/
//get user
router.get('/:id',(request,response)=>{

    User.findById(request.params.id,(err,user)=>{
			console.log(request.params.id);
             response.render('users/edit',{
                user:user//,
              //  name: user.name
            })
 
    })

})
//sup user
router.get('/delete/:id',(request,response)=>{
                console.log("suppression")        
                User.findByIdAndRemove(request.params.id, (err,user) => {
					console.log(err);
                    response.redirect('/users')
                })
        

})
//Get User/edit
router.get('/edit/:id',(request,response)=>{

    User.findById(request.params.id,(err,user)=>{
        if(user.ref != request.user._id){
            console.log(request.user._id)
            request.flash('negative','not Authorized');
            response.redirect('/users');
        }else{
        response.render('edit',{user:user})}
    })

})
router.post('/edit/:id',(request,response)=>{
    let user={};
     user.nom = request.body.nom ;
        user.prenom = request.body.prenom ;
        user.email = request.body.email ;

    User.update({_id:request.params.id},user,(error)=>{
        request.flash('positive',"modifié avec succès !")
        response.redirect('/users')

    })
	
})




module.exports = router;





module.exports = router;