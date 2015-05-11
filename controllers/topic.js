var models = require('../models');
var Topic = models.Topic;
var validator = require('validator');
var config = require('../config');
var tools = require('../common/tools');
var mdHelper = require('../common/mdHelper');

exports.show = function(req, res){
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }
    
    res.render('topics/edit', {
        title: '新建文章',
        tabs: config.tabs
    });
};

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
        return res.render('topics/edit', {
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

exports.update = function(req, res, next){
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }
    var topic_id = req.params.tid;
    Topic.findOne({_id: topic_id}, function (error,topic) {
        if(error){
            return res.render('error', {
                title: "Error",
                error:{
                    message: '此话题不存在或已被删除。',
                }
            });
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
            return res.render('topics/edit', {
              edit_error: editError,
              title: topic.title.substring(0,20),
              topic: topic,
              action: "edit",
              tabs: config.tabs,
              tab:topic.type
            });
        }
        
        topic.title = title;
        topic.content = content;
        topic.type = tab;
        topic.user_name = req.session.user.userName;
        topic.update_at = new Date();
        topic.save(function (err, topic){
            if (err) {
                return next(err);
            }

            res.redirect('/topic/' + topic._id);
        });
    });
};

exports.index = function (req, res, next) {
    var topic_id = req.params.tid;
    
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
        topic.mdContent = mdHelper.markdown(topic.content);
        
        res.render('topics/index', {
            title: topic.title.substring(0,20),
            topic: topic
        });
        
    });
};

exports.showEdit = function(req, res, next){
  var topic_id = req.params.tid;
    
    Topic.findOne({_id: topic_id}, function (error,topic) {
        if(error){
            return res.render('error', {
                title: "Error",
                error:{
                    message: '此话题不存在或已被删除。',
                }
            });
        }

        topic.friendly_create_at = tools.formatDate(topic.create_at);
        topic.friendly_update_at = tools.formatDate(topic.update_at);
        
        res.render('topics/edit', {
            title: topic.title.substring(0,20),
            topic: topic,
            action: "edit",
            tabs: config.tabs,
            tab:topic.type
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
            topic.brief_content =  mdHelper.markdown(topic.content);
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

exports.delete = function(req, res, next){
    var topic_id = req.params.tid;
    
    Topic.findOne({_id: topic_id}, function (err, topic) {
        console.log(topic_id);
        if (err) {
           return res.render('error', {
                title: "Error",
                error:{message: '此话题不存在或已被删除。',}
            });
        }
        if (!topic) {
          res.status(422);
          return res.send({ success: false, message: '此话题不存在或已被删除。' });
        }
        
        topic.deleted = true;
        topic.save(function (err) {
            if (err) {
                return res.send({ success: false, message: err.message });
            }
            res.send({ success: true, message: '话题已被删除。' });
        });
    });
};
                                     