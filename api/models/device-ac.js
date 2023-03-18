const mongoose = require('mongoose');

module.exports = mongoose.model('Device_AC', new mongoose.Schema({
  device_name: String,
  quantity: String
}, { collection : 'ac' }));