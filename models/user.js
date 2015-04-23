var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: {type: String},
    password: {type: String}
});

mongoose.model('User', userSchema);



































