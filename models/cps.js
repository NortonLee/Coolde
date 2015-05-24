var mongoose = require('mongoose');

var cpsSchema = new mongoose.Schema({
    source: {type: String},
    html_content: {type: String},
    status: {type:Boolean, default: true},
    create_at: {type: Date, default: Date.now },
});

mongoose.model('CPS', cpsSchema);