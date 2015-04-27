exports.showManager = function(req, res){
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }
    res.render('manager/manager', {title: '文章发布'});
};