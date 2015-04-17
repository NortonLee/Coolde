var settings = require('../settings');
var MongoClient = require('mongodb').MongoClient;

function User(user){
    this.name = user.name;
    this.password = user.password;
}

module.exports = User;

<<<<<<< HEAD
=======
User.prototype.save = function save(callback){
    var user = {
        name: this.name,
        password:this.password
    };
    
    callback(err,user);
    /*console.log(mongodb);
    
    mongodb.open(function(err, db){
        console.log(db);
        if(err){
            console.log(err);
            return callback(err);
        }
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
    
            collection.ensureIndex('name', {unique: true});
            collection.insert(user,{safe:true}, function(err,user){
                mongodb.close();
                callback(err,user);
            });
        });
    });*/   
};

>>>>>>> 29ba7ee32a819814fefbb3b4cdd4c85babb570aa
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
                    mongodb.close();
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
}


































