const mongoose = require('mongoose');

module.exports = mongoose.model('Device_Security', new mongoose.Schema({
  device_name: String,
  quantity: String
}, { collection : 'security' }));