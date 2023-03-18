const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 4000;
const Device = require('./models/device');

mongoose.connect('mongodb+srv://sahil:sahil@cluster0.bqwowaf.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

app.get('/api/device', async (req, res) => {
  const deviceName = req.body.device;
  const device = await Device.findOne({ device: deviceName });

  if (!device) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(device);
});

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "device": "Smart AC",
*      "info": "Cools"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/devices', async (req, res) => {
  const device = await Device.find({});
  res.status(200).send(device)
})

/**
* @api {post} /api/devices AddDevice Add a new device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "Device added successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device could not be added"
*  }
*/

app.post('/api/devices', async (req, res) => {
  const device = new Device(req.body);
  await device.save();
  res.status(201).send(device);
});

/**
* @api {delete} /api/devices/:id DeleteDevice Delete a device by ID
* @apiGroup Device
* @apiParam {String} id ID of the device to delete
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "Device deleted successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device not found"
*  }
*/

app.delete('/api/devices/:device', async (req, res) => {
  const deviceName = req.params.device;
  const deletedDevice = await Device.findOneAndDelete({ device: deviceName });

  if (!deletedDevice) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(deletedDevice);
});

/**
* @api {put} /api/devices UpdateDevice Update an existing device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "Device updated successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device not found"
*  }
*/

app.put('/api/devices/:device', async (req, res) => {
  const deviceName = req.params.device;
  const updatedDevice = await Device.findOneAndUpdate({ device: deviceName }, req.body, { new: true });

  if (!updatedDevice) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(updatedDevice);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});