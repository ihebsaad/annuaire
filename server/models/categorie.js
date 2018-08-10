var mongoose = require('mongoose');
 
  
var categorieSchema = mongoose.Schema({
	titre: {
		type: String,
		required:true
	},
	type: {
		type: String,
		required:true
	} ,
    parent: {
        type: String,
        required:false
    }
});

 
 
let Categorie = module.exports = mongoose.model('Categorie', categorieSchema);
 