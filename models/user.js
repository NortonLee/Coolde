var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: {type: String},
    password: {type: String}
});

userSchema.statics.findByName = function(userName, callback) {
    return this.findOne({userName: userName}, callback);
}

mongoose.model('User', userSchema);


































