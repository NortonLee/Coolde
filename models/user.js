var settings = require('../settings');
var MongoClient = require('mongodb').MongoClient;

function User(user){
    this.name = user.name;
    this.password = user.password;
}

module.exports = User;

User.get = function get(username, callback){
    MongoClient.connect(settings.url, function(err, db) { 
        if (err)  
        {  
            console.log("the err is:");  
            console.log(err);  
        }  
        else  
        {  
            db.collection('users', function(err, collection){
                if(err){
                    db.close();
                    return callback(err);
                }

                collection.findOne({name: username}, function(err, doc){
                    db.close();
                    if(doc){
                        var user = new User(doc);
                        callback(err, user);
                    }else{
                        callback(err,null);
                    }
                });
            });
        }
    });
};


































