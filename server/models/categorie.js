var mongoose = require('mongoose');
 
  
var categorieSchema = mongoose.Schema({
	titre: {
		type: String,
		required:true
	},
	type: {
		type: String,
		required:true
	} 
});

 
 
let Categorie = module.exports = mongoose.model('Categorie', categorieSchema);
 