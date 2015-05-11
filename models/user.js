var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: {type: String},
    password: {type: String},
    website: {type: String},
    email: {type: String},
    address: {type: String},
    weibo: {type: String},
    signature: {type: String}
});

mongoose.model('User', userSchema);



































