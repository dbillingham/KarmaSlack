var express = require('express'),
	bodyParser = require('body-parser'),
  	mongoose = require('mongoose');
  
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  
var app = express();

var config = require('./config.js')[env];

app.post('/test', function(req, res){
  
   //var searchString = req.body.text;
	res.send("working");
});

app.listen(config.port, function(){
	console.log('Running on PORT ' + config.port);
});