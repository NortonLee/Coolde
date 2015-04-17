var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    assert = require('assert'),
    settings = require('../settings');

<<<<<<< HEAD

/*module.exports = new Db(settings.db, new Server(settings.host,"27017", { auto_reconnect: true }));*/
=======
module.exports = new Db(settings.db, new Server(settings.host, settings.db_port));
>>>>>>> 29ba7ee32a819814fefbb3b4cdd4c85babb570aa

/*module.exports = new Db(settings.db, new Server(settings.host, settings.db_port,{}), {w:1});*/