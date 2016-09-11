var mongoose = require('mongoose');

var configSchema = new mongoose.Schema({
    key: {type: String},
    value: {type: String},
    desc: {type: String},
    create_at: {type: Date, default: Date.now },
});

mongoose.model('Config', cpsSchema);