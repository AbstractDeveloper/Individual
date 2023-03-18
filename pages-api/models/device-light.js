const mongoose = require('mongoose');

module.exports = mongoose.model('Device_Light', new mongoose.Schema({
  device_name: String,
  quantity: String
}, { collection : 'light' }));