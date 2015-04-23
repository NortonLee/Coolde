var mongoose = require('mongoose');
var settings = require('../settings');

var db = mongoose.createConnection(settings.url);
/*var db = mongoose.createConnection();
db.openSet("mongodb://user:pwd@localhost:27020/testing,mongodb://example.com:27020,mongodb://localhost:27019");*/

db.on('error', function(error){
    console.log(error);
});

/*mongoose.connect(settings.url, function (err) {
  if (err) {
    console.error('connect to %s error: ', settings.db, err.message);
    process.exit(1);
  }
});*/

// models
require('./user');
exports.User = mongoose.model('User');