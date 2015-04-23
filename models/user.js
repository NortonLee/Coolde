var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: {type: String},
    password: {type: String}
});

userSchema.statics.findByName = function(userName, callback) {
    return this.findOne({userName: userName}, callback);
}

<<<<<<< HEAD
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
=======
mongoose.model('User', userSchema);
>>>>>>> origin/master


































