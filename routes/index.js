var express = require('express');
var app = express();
var router = express.Router();
var crypto = require('crypto');
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Coolde, 酷的' });
});

router.get('/blog', function(req,res){
    res.render('index',{ title: '博文' });
});

router.get('/life', function(req,res){
    res.render('index',{ title: '杂感' });
});

router.get('/music', function(req,res){
    res.render('index',{ title: '音乐' });
});

router.get('/movie', function(req,res){
    res.render('index',{ title: '电影' });
});

router.get('/about', function(req,res){
    res.render('about',{ title: '关于酷的' });
});

router.get('/admin', function(req,res){
    res.render('./admin/login', {title: 'Coolde 后台管理' });
});

router.get('/manager', function(req, res){
    res.render('./admin/manager', {title: 'Coolde 后台管理'});
});

router.post('/admin', function(req,res){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    var user = new User({
        name: req.body.username,
        password: password
    });
    res.redirect('/manager');
    /*user.save(function(err){
        if(err){
            req.flash('error', err);
            return res.redirect('/admin/login');
        }
        
        //req.session.user = user;
        //req.redirect('/manager');
        console.log('true');
    });*/
});


module.exports = router;
