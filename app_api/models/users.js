const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
        unique: true,
        required: true
    },
    phone:{
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
