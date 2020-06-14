const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    },
    hash: String,
    salt: String
});


UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
};


/*UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.set('toJSON', {
    virtuals: true
});*/

mongoose.model('User', UserSchema);
