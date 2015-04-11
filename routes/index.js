var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '首页' });
});

router.get('/blog',function(req,res){
    res.render('blog',{ title: '博文' });
});

router.get('/lift',function(req,res){
    res.render('lift',{ title: '杂感' });
});

router.get('/musicmusic',function(req,res){
    res.render('music',{ title: '音乐' });
});

router.get('/movie',function(req,res){
    res.render('movie',{ title: '电影' });
});

router.get('/about',function(req,res){
    res.render('about',{ title: '关于酷的' });
});

module.exports = router;
