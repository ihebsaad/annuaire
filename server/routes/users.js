var express = require('express');
var router = express.Router();
var Repertoire = require('../models/repertoire');
var expressValidator = require('express-validator');

var User = require('../models/user');
var cors = require('cors');


var cors = require('cors');

var corsOptions = {
  
    origin: 'http://localhost:4200',
   // origin: 'http://'+window.location.hostname+':4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(expressValidator());

router.use(cors(corsOptions));

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

    request.checkBody('fullName','le nom est obligatoire').notEmpty()
    request.checkBody('email','l  email est obligatoire').notEmpty()
    request.checkBody('satus','le status est obligatoire').notEmpty()
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
        let user = new User();
        user.fullName = request.body.fullName ;
        user.email = request.body.email ;
        user.status = request.body.status ;

        user.save((error) => {
            if (error) throw error
            else
            /* request.flash('positive', "ajouté avec succès!")
             response.redirect('/users') */
                response.json({

                    result : "ajouté avec succès!"

                });

        })

    }

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

module.exports = router;