var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {type: String},
    password: {type: String}
});

mongoose.model('User', userSchema);



































