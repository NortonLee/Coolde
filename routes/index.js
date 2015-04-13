var express = require('express');
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
    res.render('./admin/login', {title: 'Coolde 后台管理' });
});

module.exports = router;
