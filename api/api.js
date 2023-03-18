const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const Device_Light = require('./models/device-light');
const Device_AC = require('./models/device-ac');
const Device_Security = require('./models/device-security');
mongoose.connect('mongodb+srv://sahil:sahil@cluster0.bqwowaf.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true });
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/devices_light', async (req, res) => {
  try {
    const devices = await Device_Light.find({});
    return res.send(devices);
  } catch (err) {
    return res.send(err);
  }
});

app.get('/api/devices_ac', async (req, res) => {
  try {
    const devices = await Device_AC.find({});
    return res.send(devices);
  } catch (err) {
    return res.send(err);
  }
});

app.get('/api/devices_security', async (req, res) => {
  try {
    const devices = await Device_Security.find({});
    return res.send(devices);
  } catch (err) {
    return res.send(err);
  }
});

app.post('/api/devices_light', async (req, res) => {
  const { device_name, quantity } = req.body;
  const newDevice = new Device_Light({
    device_name, 
    quantity
  });
  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
});

app.post('/api/devices_ac', async (req, res) => {
  const { device_name, quantity} = req.body;
  const newDevice = new Device_AC({
    device_name, 
    quantity
  });
  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
});

app.post('/api/devices_security', async (req, res) => {
  const { device_name, quantity} = req.body;
  const newDevice = new Device_Security({
    device_name, 
    quantity
  });
  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
