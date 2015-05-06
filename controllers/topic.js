var models = require('../models');
var Topic = models.Topic;
var validator = require('validator');
var config = require('../config');
var tools = require('../common/tools');

exports.create = function(req, res, next){
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
    }

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

exports.topic_list = function(req, res ,next){
    var title;
    var type;
    var page = Number(req.params.page) || 1;
    switch(req.url){
        case "/":
        case "/all/" + page:
            title = "Coolde, 酷的";
            type = "all";
            break;
        case "/blog":
        case "/blog/" + page:
            title = "博文";
            type = "blog";
            break;
        case "/life":
        case "/life/" + page:
            title = "杂感";
            type = "life";
            break;
        case "/music":
        case "/music/" + page:
            title = "音乐";
            type = "music";
            break;
        case "/movie":
        case "/movie/" + page:
            title = "电影";
            type = "movie";
            break;
    }
    console.log(type);
    var limit = config.web_list_topic_cout;
    
    var opt = {skip: (page - 1) * limit, limit: limit, sort: '-create_at'};
    var query;
    if(type == "all"){
        query = {'deleted': false};
    }else{
        query = {
            'deleted': false,
            'type': type    
        };
    }
    
    console.log(query);
    
    Topic.find(query,'',opt, function (err, docs) {
        if (err) {
          return next(err);
        }
        if (docs.length === 0) {
          return next(null, []);
        }
        
        docs.forEach(function(topic){
            topic.friendly_create_at = tools.formatDate(topic.create_at);
            topic.brief_content = topic.content.substr(0,200);
        });

        Topic.count(query, function(error,count){
            var pages = Math.ceil(count / limit);
            return res.render('index', {
                title: title,
                topics: docs,
                current_page: page,
                pages: pages,
                type: type,
            });
        });
    });
};
                                     