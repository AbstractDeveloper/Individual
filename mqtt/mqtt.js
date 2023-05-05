const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const sensor = require('./models/data');
const Light = require('./models/light');
const app = express();
const port = 7000;

mongoose.connect('mongodb+srv://sahil:sahil@cluster0.bqwowaf.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/sahil/ir');
});

var value="";
var led ="off";

app.get('/sensor',(req,res)=>{
    sensor.find({})
    .then((sensor) => {
        res.send(sensor);
    })
    .catch((error)=>{
        res.send(error);
        console.log(error);
    })
})

client.on('message', (topic,message) => {
    if(topic=="/sahil/ir"){
        const data = message.toString();

        if(data<=10){
            led="on"
        }else{
            led="off"
        }

        const sensorData = {
            value:data
        }
        console.log(led);
        const up = {device_name:"Xyz"};
        const update = {quantity:led}
        const NewSensor = new sensor(sensorData);
        const ok = Light.findOneAndUpdate(up,update);
        console.log(NewSensor);
        // console.log(ok);
        NewSensor.save();
    }
})

app.listen(port);