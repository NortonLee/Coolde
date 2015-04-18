var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    assert = require('assert'),
    settings = require('../settings');

module.exports = new Db(settings.db, new Server(settings.host, settings.db_port));

/*module.exports = new Db(settings.db, new Server(settings.host, settings.db_port,{}), {w:1});*/