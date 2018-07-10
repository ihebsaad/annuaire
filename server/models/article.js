var mongoose = require('mongoose');
 
  
var articleSchema = mongoose.Schema({
	title: {
		type: String,
		required:true
	},
	contenu: {
		type: String,
		required:true
	} 
	,
	auteur: {
		type: String,
		required:true
	} 
});

 
/*
var UserSchema = mongoose.Schema({
	local {
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
	},
	facebook{
		id:String,
		token:String,
		email:String,
		name:String
		
	}
});
*/
let Article = module.exports = mongoose.model('Article', articleSchema);
/*
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
	
}*/