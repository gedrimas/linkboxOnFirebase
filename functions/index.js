var User = require('./api/models/userModel'),
jsonwebtoken = require("jsonwebtoken");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();


var serviceAccount = require("./mylinkbox-gedrimas-firebase-adminsdk-bxl51-fe27ad57ba.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mylinkbox-gedrimas.firebaseio.com"
});



app.use(cors({ origin: true }));


// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 3000,
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
  
// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb+srv://gedrimas:va47-100_MoN@cluster0-cxnct.mongodb.net/test?retryWrites=true/mylinkbox',{useNewUrlParser: true, useUnifiedTopology: true }); 

//app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/',function(req,res){
 
//   res.sendFile(path.join(__dirname+'/front/build/index.html'));
// });

// app.get('/favicon.png',function(req,res){
//   res.sendFile(path.join(__dirname+'/front/build/favicon.png'));
// });

// app.get('/2.5ac4591a.chunk.js',function(req,res){
//   res.sendFile(path.join(__dirname+'/front/build/static/js/2.5ac4591a.chunk.js'));
// });

// app.get('/main.273fe807.chunk.js',function(req,res){
//   res.sendFile(path.join(__dirname+'/front/build/static/js/main.273fe807.chunk.js'));
// });

// app.get('/manifest.json',function(req,res){
//   res.sendFile(path.join(__dirname+'/front/build/manifest.json'));
// });



app.use(function(req, res, next) {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if(err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

exports.app = functions.https.onRequest(app);
var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

//app.listen(port);

//console.log('todo list RESTful API server started on: ' + port);
