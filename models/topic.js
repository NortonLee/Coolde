var mongoose = require('mongoose');
var config = require('../config');

var topicSechma = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    user_name: {type: String},
    create_at: {type: Date, default: Date.now },
    update_at: {type: Date, default: Date.now },
    type: {type: String},
    deleted: {type: Boolean, default: false},
    visit_count: {type: Number, default: 0},
    isTop: { type: Boolean, default:false }
});

topicSechma.index({create_at: -1});

topicSechma.virtual('tabName').get(function(){
    var tab = this.type;
    var pair = _.find(config.tabs, function(_pair){
        return _pair[0] === tab;
    });
    if(pair){
        return pair[1];
    }else{
        return '';
    }
});

mongoose.model('Topic', topicSechma);