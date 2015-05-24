var app = require('express')();

exports.userRequired = function (req, res, next) {
    if(req.session.user === null || req.session.user === undefined){
        res.redirect('/login');
    }
    next();
};