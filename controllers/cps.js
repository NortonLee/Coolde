var models = require('../models');
var tools = require('../common/tools');
var CPS = models.CPS;
var config = require('../config');
var validator = require('validator');

exports.showCPS = function(req, res, next){
    var success;
    if (req.query.save === 'success') {
            success = '保存成功。';
            validate_error = null;
    }
    
    return res.render('cps/edit', {
                title: "新增CPS",
                cps_sources: config.cps_sources,
                success: success
            });
};

exports.siwtch = function(req, res, next){
    var cps_id = req.params.tid;
    
    CPS.findOne({_id: cps_id}, function (err, cps) {
        if (err) {
           return res.render('error', {
                title: "Error",
                error:{message: 'CPS资源不存在。',}
            });
        }
        if (!cps) {
          res.status(422);
          return res.send({ success: false, message: 'CPS资源不存在。' });
        }
        
        cps.status = !cps.status;
        cps.save(function (err) {
            if (err) {
                return res.send({ success: false, message: err.message });
            }
            return res.render('error', {
                title: "Error",
                error:{message: 'CPS资源不存在。',}
            });
        });
    });
    return res.redirect("/cps/list");
};

exports.showList = function(req, res, next){
    var page = Number(req.query.page) || 1;
    var limit = config.cps_limit;
    var opt = {skip: (page - 1) * limit, limit: limit, sort: '-create_at'};
    
    CPS.find('','',opt,function (err, docs) {
        if (err) {
          return next(err);
        }
        if (docs.length === 0) {
          return res.render('cps/list', {
                title: "CPS商盟",
                topics: docs
            });
        }
        
        docs.forEach(function(cps){
            cps.friendly_create_at = tools.formatDate(cps.create_at);
            cps.operate = cps.status ? "禁用" : "启用";
        });

        CPS.count(function(error,count){
            var pages = Math.ceil(count / limit);
            return res.render('cps/list', {
                title: "CPS商盟",
                cpss: docs,
                current_page: page,
                pages: pages,
            });
        });
    });
};

exports.create = function(req, res, next){    
    var tab = validator.trim(req.body.tab);
    tab = validator.escape(tab);
        console.log(tab);
    var html_content = validator.trim(req.body.html_content);
    var allTabs = config.cps_sources.map(function (tPair) {
        return tPair[0];
    });

  // 验证
  var validate_error;
  if (!tab || allTabs.indexOf(tab) === -1) {
    validate_error = '必须选择一个CPS来源。';
  } else if (html_content === '') {
    validate_error = 'CPS内容不可为空';
  }
    
  // END 验证

    if (validate_error) {
        res.status(422);
        return res.render('cps/edit', {
          validateError: validate_error,
          title: '新增CPS',
          cps_sources: config.cps_sources,
          tab: tab
        });
    }

    var cps = new CPS();
    cps.source = tab;
    cps.html_content = html_content;
    cps.save(function (err, cps){
        if (err) {
            return next(err);
        }
        res.redirect('/cps/edit?save=success');
    });
};

exports.delete = function(req, res, next){
    var cps_id = req.params.tid;
    
    CPS.findOne({_id: cps_id}, function (err, cps) {
        if (err) {
           return res.render('error', {
                title: "Error",
                error:{message: 'CPS资源不存在。',}
            });
        }
        if (!cps) {
          res.status(422);
          return res.send({ success: false, message: 'CPS资源不存在。' });
        }
        
        cps.remove(function (err) {
            if (err) {
                return res.send({ success: false, message: err.message });
            }
            return res.render('error', {
                title: "Error",
                error:{message: 'CPS资源不存在。',}
            });
        });
    });
    return res.redirect("/cps/list");
};