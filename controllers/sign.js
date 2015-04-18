var User = require("../models/user");
var crypto = require('crypto');

exports.showLogin = function(req, res){
    res.render('sign/login', {title: '登陆'});
};

exports.login = function(req, res){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    User.get(req.body.username, function(err, user){
        if(!user){
            return res.render('sign/login', { error: '用户不存在。' });
        }
        if(user.password != password && user.password != req.body.password){
            req.flash('error', '用户密码错误。');
            return res.redirect('login');
        }
        
        req.session.user = user;
        res.redirect('manager');
    });
};

exports.logout = function(req, res){
    req.session.user = null;
    res.redirect('/');
};