const express = require('express');
const app = express();
const port = 2000;
const base = `${__dirname}/public`;
const mongoose = require("mongoose");
const User = require("./database");
const bodyParser = require("body-parser");
const { initializingPassport, protected } = require('./passportconfig');
const ejs = require('ejs');
const helmet = require('helmet');
const expressSession = require("express-session");
const passport  = require('passport');


app.use(express.static(base));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.originAgentCluster());
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

initializingPassport(passport);

mongoose.connect('mongodb+srv://sahil:sahil@cluster0.bqwowaf.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true });



app.get('/', (req, res) => {
  res.sendFile(`${base}/welcome.html`);
});

app.post('/register', async(req, res) => {
  const user = await User.findOne({username:req.body.username});

  if(user) return res.status(400).send("user already exist! ");

  const newUser = await User.create(req.body);
  res.redirect('/login');
})

app.post('/login', passport.authenticate('local', {
  failureFlash: true,failureRedirect: "/login"
}), function(req, res) {
  // Redirect to homepage on success
  res.redirect('/lightning');
});

app.get('/register', (req, res) => {
  res.sendFile(`${base}/register.html`);
});

app.get('/contact',protected, (req, res) => {
  res.sendFile(`${base}/contact.html`);
});

app.get('/air-conditioning',protected, (req, res) => {
  res.sendFile(`${base}/air-conditioning.html`);
});

app.get('/lightning',protected, (req, res) => {
  res.sendFile(`${base}/lightning.html`);
});

app.get('/delete-device',protected, (req, res) => {
  res.sendFile(`${base}/delete-device.html`);
});

app.get('/graph',protected, (req, res) => {
  res.sendFile(`${base}/graph.html`);
});

app.get('/login', (req, res) => {
  res.sendFile(`${base}/login.html`);
});

app.get('/graph',protected, (req, res) => {
  res.sendFile(`${base}/graph.html`);
});

app.get('/register-device',protected, (req, res) => {
  res.sendFile(`${base}/register-device.html`);
});

app.get('/registered-device',protected, (req, res) => {
  res.sendFile(`${base}/registered-device.html`);
});

app.get('/register', (req, res) => {
  res.sendFile(`${base}/register.html`);
});

app.get('/security',protected, (req, res) => {
  res.sendFile(`${base}/security.html`);
});

app.get('/welcome', (req, res) => {
  res.sendFile(`${base}/welcome.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
