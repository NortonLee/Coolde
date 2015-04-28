var express = require('express');

var sign = require('./controllers/sign');
var manager = require('./controllers/manager');
var topic = require('./controllers/topic');

var router = express.Router();

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
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }else{
        res.redirect('/manager');
    }
});

//login
router.get('/login', sign.showLogin);
router.post('/login', sign.login);
router.get('/logout', sign.logout);

//manager
router.get('/manager', manager.showManager);

//topic
router.get('/topic/create', topic.show);
router.post('/topic/create', topic.create);
router.get('/topic/:tid', topic.index);  


module.exports = router;












