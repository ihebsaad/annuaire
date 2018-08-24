var mongoose = require('mongoose');


var repertoireSchema = mongoose.Schema({
    titre: {
        type: String,
        required:true
    },
    categorie: {
        type: String,
        required:true
    },
    tel: {
        type: String,
        required:false
    },
    ville: {
        type: String,
        required:true
    },
    adresse: {
        type: String,
        required:true
    },
    auteur: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required:true,
        default: 'non approuvé'
    },
    image: {
        type: String,
        required:true
    },
    note: {
        type: Number,
        required:true,
        default: 0
    },
    nbVote: {
        type: Number,
        required:true,
        default: 0
    }
});



let Repertoire = module.exports = mongoose.model('Repertoire', repertoireSchema);
