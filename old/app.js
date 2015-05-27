var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Slack = require('slack-node');
  
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  
var app = express();

var config = require('./config.js')[env];

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test', function(req, res){
  
	var channelName = req.body.channel_name;
  	//var a = req.body.text;
	  
	var slackRes = new Slack();
	slackRes.setWebhook("https://hooks.slack.com/services/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");
	
	slackRes.webhook({
	  channel: "#" + channelName,
	  username: "webhookbot",
	  text: "This is posted to #general and comes from a bot named webhookbot. "
	}, function(err, response) {
	  console.log(response);
	});
	
  
 
	//res.send("working");
});

app.listen(config.port, function(){
	console.log('Running on PORT ' + config.port);
});