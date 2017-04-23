var express = require('express');

var sign = require('./controllers/sign');
var manager = require('./controllers/manager');
var topic = require('./controllers/topic');
var user = require('./controllers/user');
var cps = require('./controllers/cps');
var auth = require('./controllers/auth');
var config = require('./config');
var api = require('./controllers/api');

var router = express.Router();
var latestv = 'indexv3'

/* GET home page. */
router.get('/', function (req, res) {
    res.render(req.query.vison ? 'index' + req.query.vison: latestv);
});
router.get('/all/:page', topic.topic_list);
router.get('/blog', topic.topic_list);
router.get('/blog/:page', topic.topic_list);
router.get('/life', topic.topic_list);
router.get('/life/:page', topic.topic_list);
router.get('/music', topic.topic_list);
router.get('/music/:page', topic.topic_list);
router.get('/movie', topic.topic_list);
router.get('/movie/:page', topic.topic_list);
router.get('/common/coupons', function (req, res) {
    res.render('./common/YMCCoupons', {
        ymc_coupons: config.ymc_coupons
    });
});

router.get('/about', function (req, res) {
    res.render('aboutv2', { title: '关于酷的' });
});

router.get('/admin', function (req, res) {
    if (req.session.user === null || req.session.user === undefined) {
        res.redirect('/login');
    } else {
        res.redirect('/manager');
    }
});

//login
router.get('/login', sign.showLogin);
router.post('/login', sign.login);
router.get('/logout', sign.logout);

//manager
router.get('/manager', auth.userRequired, manager.showManager);

//topic
router.get('/topic/create', auth.userRequired, topic.show);
router.post('/topic/create', auth.userRequired, topic.create);
router.get('/topic/:tid', topic.index);
router.get('/topic/:tid/edit', auth.userRequired, topic.showEdit);
router.post('/topic/:tid/edit', auth.userRequired, topic.update);
router.post('/topic/:tid/delete', auth.userRequired, topic.delete);
router.get('/topic/top/:tid', topic.top);

//acount
router.get('/manager/account', auth.userRequired, user.showAccount);
router.post('/manager/account', auth.userRequired, user.updateAccount);
router.post('/manager/change_profile', auth.userRequired, user.change_profile);

//cps
router.get('/cps/edit', auth.userRequired, cps.showCPS);
router.post('/cps/edit', auth.userRequired, cps.create);
router.get('/cps/list', auth.userRequired, cps.showList);
router.get('/cps/:tid', auth.userRequired, cps.siwtch);
router.get('/cps/:tid/delete', auth.userRequired, cps.delete);

//system
router.get('/manager/system', auth.userRequired, manager.showSystem);

//api
router.get('/api/getKnowlegeChart',api.getKnowlegeChart)

module.exports = router;












