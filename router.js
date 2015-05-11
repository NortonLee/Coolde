var express = require('express');

var sign = require('./controllers/sign');
var manager = require('./controllers/manager');
var topic = require('./controllers/topic');

var router = express.Router();

/* GET home page. */
router.get('/', topic.topic_list);
router.get('/all/:page', topic.topic_list);
router.get('/blog', topic.topic_list);
router.get('/blog/:page', topic.topic_list);
router.get('/life', topic.topic_list);
router.get('/life/:page', topic.topic_list);
router.get('/music', topic.topic_list);
router.get('/music/:page', topic.topic_list);
router.get('/movie', topic.topic_list);
router.get('/movie/:page', topic.topic_list);

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
router.get('/topic/:tid/edit', topic.showEdit);
router.post('/topic/:tid/edit', topic.update);
router.post('/topic/:tid/delete', topic.delete);

module.exports = router;












