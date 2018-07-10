var mongoose = require('mongoose');
 
  
var annonceSchema = mongoose.Schema({
	titre: {
		type: String,
		required:true
	},
	details: {
		type: String,
		required:true
	},
	auteur: {
		type: String,
		required:true
	} 
});

  
let Annonce = module.exports = mongoose.model('Annonce', annonceSchema);
 