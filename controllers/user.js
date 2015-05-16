var models = require('../models');
var crypto = require('crypto');
var User = models.User;
var validator = require('validator');
var config = require('../config');
var fs = require("fs");
var formidable = require('formidable');

var postData;

exports.change_profile = function(req, res, next){
    var form = new formidable.IncomingForm();
    form.uploadDir = "../public/images/";
    form.parse(req, function(err, fields, files) {
        fs.readFile(files.file.path, function (err, data) {
          if (err) throw err;
            fs.writeFile("../public/images/profile.jpg", data, function(err){
                fs.unlinkSync(files.file.path);
            });
        });
        return res.render('manager/account', {
            title:"账户管理"
        });
    });
};

exports.showAccount = function(req, res, next){
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }
    
    User.findOne({userName: req.session.user.userName}, function (err, user) {
        if (err) {
          return next(err);
        }
        if (req.query.save === 'success') {
            user.success = '保存成功。';
            user.error = null;
        }
        if(req.query.update === 'fail'){
            user.error = "密码信息不能为空。";
        }
        
        return res.render('manager/account', user);
  });
};

exports.updateAccount = function(req, res ,next){
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }
    
    function showMessage(msg, data, isSuccess) {
        data = data || req.body;
        var user = {
            loginname: data.userName,
            email: data.email,
            website: data.website,
            address: data.address,
            signature: data.signature,
            weibo: data.weibo,
            accessToken: data.accessToken,
        };
        if (isSuccess) {
            user.success = msg;
        } else {
            user.error = msg;
        }
        res.render('manager/account', user);
    }
    
    var action = req.body.action;
    if(action == "change_account"){
        var website = validator.trim(req.body.website);
        website = validator.escape(website);
        var address = validator.trim(req.body.address);
        address = validator.escape(address);
        var weibo = validator.trim(req.body.weibo);
        weibo = validator.escape(weibo);
        var signature = validator.trim(req.body.signature);
        signature = validator.escape(signature);
        var email = validator.trim(req.body.email);
        email = validator.escape(email);
        
        User.findOne({userName: req.session.user.userName}, function (err, user){
            user.website = website;
            user.address = address;
            user.signature = signature;
            user.weibo = weibo;
            user.email = email;
            user.save(function (err) {
                if (err) {
                  return next(err);
                }

                return res.redirect('/manager/account?save=success');
            });
        });
    }
    
    if (action === 'change_pwd'){
        var old_pwd = validator.trim(req.body.current_pwd);
        var new_pwd = validator.trim(req.body.new_pwd);
        var md5 = crypto.createHash('md5');
        var current_passhash = md5.update(old_pwd).digest('base64');
        
        if (!old_pwd || !new_pwd) {
            return res.redirect('/manager/account?update=fail');
        }
        User.findOne({userName: req.session.user.userName}, function(err, user){console.log(user);
            if(user.password != current_passhash && user.password != req.body.current_pwd){
                return showMessage('当前密码错误。', user);
            }
                                                                                
            var md = crypto.createHash('md5');
            var new_passhash = md.update(new_pwd).digest('base64');
            user.password = new_passhash;
              user.save(function (err) {
                if (err) {
                  return next(err);
                }
                return showMessage('密码已被修改。', user, true);
              });
        });
    } 
};