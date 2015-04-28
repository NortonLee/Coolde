var models = require('../models');
var Topic = models.Topic;
var validator = require('validator');
var config = require('../config');
var tools = require('../common/tools');

exports.create = function(req, res, nex){
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }
    
    var title = validator.trim(req.body.title);
    title = validator.escape(title);
    var tab = validator.trim(req.body.tab);
    tab = validator.escape(tab);
    var content = validator.trim(req.body.t_content);
    var allTabs = config.tabs.map(function (tPair) {
    return tPair[0];
  });

  // 验证
  var editError;
  if (title === '') {
    editError = '标题不能为空。';
  } else if (!tab || allTabs.indexOf(tab) === -1) {
    editError = '必须选择一个文章类别。';
  } else if (content === '') {
    editError = '内容不可为空';
  }
    
  // END 验证

    if (editError) {
        res.status(422);
        return res.render('topics/create', {
          edit_error: editError,
          title: '新建文章',
          topic_title: title,
          content: content,
          tabs: config.tabs,
          tab: tab
        });
    };

    var topic = new Topic();
    topic.title = title;
    topic.content = content;
    topic.type = tab;
    topic.user_name = req.session.user.userName;
    topic.save(function (err, topic){
        if (err) {
            return next(err);
        }

        res.redirect('/topic/' + topic._id);
    });
};

exports.show = function(req, res){
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }
    
    res.render('topics/create', {
        title: '新建文章',
        tabs: config.tabs
    });
};

exports.index = function (req, res, next) {
    var topic_id = req.params.tid;
        /*if (topic_id.length !== 24) {
        return res.render('notify/notify', {
          error: '此话题不存在或已被删除。'
        });
    }*/
    
    Topic.findOne({_id: topic_id}, function (error,topic) {
        if(error){
            return res.render('error', {
                title: "Error",
                error:{
                    message: '此话题不存在或已被删除。',
                }
            });
        }
        
        topic.visit_count += 1;
        topic.save();
        topic.friendly_create_at = tools.formatDate(topic.create_at);
        topic.friendly_update_at = tools.formatDate(topic.update_at);
        
        res.render('topics/index', {
            title: '内容查看',
            topic: topic
        });
        
    });
};
                                     