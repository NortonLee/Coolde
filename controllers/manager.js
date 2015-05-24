var config = require('../config');
var tools = require('../common/tools');
var models = require('../models');
var Topic = models.Topic;

exports.showManager = function(req, res, next){    
    var page = Number(req.query.page) || 1;
    var limit = config.list_topic_count;
    
    var opt = {skip: (page - 1) * limit, limit: limit, sort: '-create_at'};
    var query = {'deleted': false};
    
    Topic.find(query,'',opt, function (err, docs) {
        if (err) {
          return callback(err);
        }
        if (docs.length === 0) {
          return res.render('manager/manager', {
                title: "首页",
                topics: docs
            });
        }
        
        docs.forEach(function(topic){
            topic.friendly_create_at = tools.formatDate(topic.create_at);
        });

        Topic.count(query, function(error,count){
            var pages = Math.ceil(count / limit);
            return res.render('manager/manager', {
                title: "首页",
                topics: docs,
                current_page: page,
                pages: pages,
            });
        });
    });
};

exports.showSystem = function(req, res, next){
    return res.render('manager/system',{
        title: "系统管理"
    });
};