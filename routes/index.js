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
    if(req.session.user == null){
        res.render('./admin/login', {title: '登录' });
    }else{
        res.render('./admin/manager', {title: '文章发布'});
    }
});

router.get('/login', function(req,res){
    res.render('./admin/login', {title: '登录'});
});

router.get('/manager', function(req,res){
    res.render('./admin/manager', {title: '文章发布'});
});

router.get('/manager', function(req, res){
    res.render('./admin/manager', {title: 'Coolde 后台管理'});
});

router.post('/admin', function(req,res){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
<<<<<<< HEAD
    User.get(req.body.username, function(err, user){
        if(!user){
            req.flash('error', '用户不存在！');
            return res.redirect('/login');
        }
        if(user.password != password){
            req.flash('error', '用户密码错误！');
            return res.redirect('/login');
        }
        
        req.session.user = user;
        res.redirect('/manager');
    });
=======
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
>>>>>>> 29ba7ee32a819814fefbb3b4cdd4c85babb570aa
});


module.exports = router;












