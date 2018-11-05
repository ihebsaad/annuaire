var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'simple'
    },
	    account:{
        type: String,
        required: false,
        default: ''
    },
    company:{
        type: String,
        required: false,
     }
	,
    cat1:{
        type: Boolean,
      }	,
    cat2:{
        type: Boolean,
     }	,
    cat3:{
        type: Boolean,
     }	,
    cat4:{
        type: Boolean,
     }	,
    cat5:{
        type: Boolean,
     }	,
    cat6:{
        type: Boolean,
     }	,
    cat7:{
        type: Boolean,
     }	,
    cat8:{
        type: Boolean,
     }
	/* ,
	categories: [{
              cat1: Boolean,
              cat2: Boolean,
              cat3: Boolean,
              cat4: Boolean,
              cat5: Boolean,
              cat6: Boolean,
              cat7: Boolean,
              cat8: Boolean,
            }]*/
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);