var moment = require('moment');
moment.locale('zh-cn'); // 使用中文

exports.formatDate = function (date) {
    date = moment(date);
    
    return date.format('MM/DD/YYYY HH:mm');
};