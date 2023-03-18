const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 4001;
const Device1 = require('./models/device');
const Device2 = require('./models/security');
const Device3 = require('./models/light');

mongoose.connect('mongodb+srv://sahil:sahil@cluster0.bqwowaf.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/device-ac', async (req, res) => {
  const del_ip = req.params.device;
  const deletedDevice = await Device1.findOne({ ip: del_ip });

  if (!device) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(device);
});
/**
* @api {get} /api/device-ac All AC devices
* @apiGroup AC Devices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
        "Device Name": "Smart AC",
        "Model Number": "PF2JY3",

*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/
app.get('/api/ac-devices', async (req, res) => {
  const device = await Device1.find({});
  res.status(200).send(device)
})
/**
* @api {post} /api/device-ac Add a new AC device
* @apiGroup AC Devices
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "AC Device added successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device could not be added"
*  }
*/
app.post('/api/device-ac', async (req, res) => {
  const device = new Device1(req.body);
  await device.save();
  res.status(201).send(device);
});

/**
* @api {delete} /api/device-ac/:model Delete a AC device by model
* @apiGroup AC Devices
* @apiParam model model of the device to delete
* @apiSuccessExample {json} Success-Response:
*  [
*    {
        "Model Number": "PFJY",
*    }
*  ]
*    {
*      "message": "AC Device deleted successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device not found"
*  }
*/

app.delete('/api/ac-devices/:device', async (req, res) => {
  const del_ip = req.params.device;
  const deletedDevice = await Device1.findOneAndDelete({ ip: del_ip });

  if (!deletedDevice) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(deletedDevice);
});

/**
* @api {put} /api/device-ac Update an existing AC device
* @apiGroup AC Devices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
        "Device Name": "Smart AC",
        "Model Number": "PFJY",
*    }
*  ]
*    {
*      "message": "AC Device updated successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device not found"
*  }
*/

app.put('/api/device-ac/:device', async (req, res) => {
  const update_ip = req.params.device;
  const updatedDevice = await Device1.findOneAndUpdate({ ip: update_ip }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedDevice) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(updatedDevice);
});

app.get('/api/device-security', async (req, res) => {
  const del_id = req.params.device;
  const deletedDevice = await Device2.findOne({ id: del_id });

  if (!device) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(device);
});

/**
* @api {get} /api/device-security All security devices
* @apiGroup Security Devices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "Device Name": "Smart Camera",
*      "model": "JTYE"    
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/device-security', async (req, res) => {
  const device = await Device2.find({});
  res.status(200).send(device)
})
/**
* @api {post} /api/devices Add a new Security device
* @apiGroup Security Devices
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "Device added successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device could not be added"
*  }
*/

app.post('/api/device-security', async (req, res) => {
  const device = new Device2(req.body);
  await device.save();
  res.status(201).send(device);
});

/**
* @api {delete} /api/devices/:model Delete a Security device by Model
* @apiGroup Security Devices
* @apiParam Model Model of the device to delete
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "Security Device deleted successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device not found"
*  }
*/

app.delete('/api/device-security/:device', async (req, res) => {
  const del_id = req.params.device;
  const deletedDevice = await Device2.findOneAndDelete({ id: del_id });

  if (!deletedDevice) {
    return res.status(404).send({ message: 'Device not found' });
  }
  res.status(200).send(deletedDevice);
});

/**
* @api {put} /api/devices Update an existing security device
* @apiGroup Security Devices
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "Security Device updated successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device not found"
*  }
*/

app.put('/api/device-security/:device', async (req, res) => {
  const update_id = req.params.device;
  const updatedDevice = await Device2.findOneAndUpdate({ id: update_id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedDevice) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(updatedDevice);
});

app.get('/api/device-light', async (req, res) => {
  const id = req.params.device;
  const deletedDevice = await Device3.findOne({ id: id });

  if (!device) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(device);
});

/**
* @api {get} /api/devices All light devices
* @apiGroup Light Devices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "device Name": "Smart Light",
*      "Model Number": "ASDF"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "Device does not exist"
*  }
*/

app.get('/api/device-light', async (req, res) => {
  const device = await Device3.find({});
  res.status(200).send(device)
})

/**
* @api {post} /api/devices Add a new light device
* @apiGroup Light Devices
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "Device added successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device could not be added"
*  }
*/

app.post('/api/device-light', async (req, res) => {
  const device = new Device3(req.body);
  await device.save();
  res.status(201).send(device);
});

/**
* @api {delete} /api/devices/:model Delete a light device by Model;
* @apiGroup Light Devices
* @apiParam Model Model of the device to delete
* @apiSuccessExample {json} Success-Response:
*  [
*    {
        "Model Number": "PFJY",
        "message": "Light Device deleted successfully"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device not found"
*  }
*/

app.delete('/api/device-light/:device', async (req, res) => {
  const del_id = req.params.device;
  const deletedDevice = await Device3.findOneAndDelete({ id: del_id });

  if (!deletedDevice) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(deletedDevice);
});

/**
* @api {put} /api/devices Update an existing light device
* @apiGroup Light Devices
* @apiSuccessExample {json} Success-Response:
*    {
*      "message": "Light Device updated successfully"
*    }
* @apiErrorExample {json} Error-Response:
*  {
*    "message": "Device not found"
*  }
*/

app.put('/api/device-light/:device', async (req, res) => {
  const update_id = req.params.device;
  const updatedDevice = await Device3.findOneAndUpdate({ id: update_id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedDevice) {
    return res.status(404).send({ message: 'Device not found' });
  }

  res.status(200).send(updatedDevice);
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
