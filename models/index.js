var mongoose = require('mongoose');
global.db = mongoose.createConnection();

var host, database, port, options;

if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
    host = 'mongo.duapp.com';
    database = 'tHKwaRJSTYLOKHPubAnz';
    port = 8908;
    options = {
        server: {poolSize: 5},
        user: '36233c7132c2418ab17a6e8b6ce83bdf',
        pass: '309fc530ea7644c69bdaa781dbd3e402',
    };
} else {
    host = '127.0.0.1';
    database = 'coolde';
    port = 27017;
}

db.on('disconnected', function() {
    db.open(host, database, port, options);
});

db.on('error', function(error){
    console.log(error);
});

db.on('open',function(error){
    if(error){
        console.log(error);
    }
    console.log('connect success.');
});

// models
require('./user');
require('./topic');
require('./cps');

exports.User = db.model('User');
exports.Topic = db.model('Topic');
exports.CPS = db.model('CPS');

db.open(host, database, port, options);