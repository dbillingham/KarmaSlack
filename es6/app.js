import { install as sourceMapSupportInstall } from 'source-map-support';
import Express from 'express';
import BodyParser from 'body-parser';
import Slack from 'slack-node';

import Config from '../es5/config.js'; 
import KarmaMongoose from '../es5/karmamongoose.js';
import KarmaModel from '../es5/karma.model.js'; 

sourceMapSupportInstall();

var app = Express();
app.use(BodyParser.urlencoded({ extended: true }));

var config = new Config();

var karmaMongoose = new KarmaMongoose(config);
karmaMongoose.init();



var add = function(teamId, userName){
	
	return KarmaModel.create({
		"teamId": teamId,
		"userName": userName,
	})
	.then(() => {
		
		return userCount(teamId, userName, "increased");
	});
};

var remove = function(teamId, userName){
	
	return KarmaModel.deleteLatestPoint(teamId, userName)	
	.then(() => {
		
		return userCount(teamId, userName, "decreased");
	});
};

var userCount = function(teamId, userName, incDec){
  
	return KarmaModel.points(teamId, userName)
	.then((collection) => {
		var response = `${userName} has a karma of ${collection.length}!`; 		 

		if(incDec){
			response = `${userName}s karma has ${incDec} to ${collection.length}!`;
		}
		
		console.log(response);
	});
};

add("111", "DAN").then(function(){

	remove("111", "DAN").then(function(){

		userCount("111", "DAN");
	});
});
/*
console.log("1");
add("111", "DAN")
.then(()=>{
	console.log("3");
	remove("111", "DAN");
})


var promise = new Promise((resolve,reject) => {
	add("111", "DAN").then(resolve(2));
	console.log("1");
	//resolve(2);
}).then((a)=>{
	console.log(a);
	remove("111", "DAN");
})*/




var teamCount = function(teamId, userName){
	
};


//app.post('/test2',  (req, res) => {
	

	
	
	//KarmaModel.find({}).remove().exec();
	
	//KarmaModel.find({}).exec(function(err, collection){
     /*   var promise = KarmaModel.create({
			  "teamId":"111",
	          "userName":"DAN",
	        },{
			  "teamId":"111",
	          "userName":"DAN",
	        },{
			  "teamId":"111",
	          "userName":"BRETT",
        });	
		
		promise.then((err, karmas) => {
		  	KarmaModel.points("111","BRETT", function(err, collection){
				//console.log('eeee: ' + collection.length);
			});
		});*/
			
	//});
	



	 //res.send('Hello World!');
	
//});

app.post('/test',  (req, res) => {
	
	
	var channelName = req.body.channel_name;
	var text = req.body.text;
	var slackResponse = `Response: ${text}`;
	
	
	
	
	/*
	
	mongoose.connect(config.db);
	
	var db = mongoose.connection;
	
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback(){
		console.log('db opened');
	});
	
	Contact.find({}).remove().exec();
	
	Contact.find({}).exec(function(err, collection){
	        Contact.create({
	          "name":text,
	        });	
	});
	
	*/
	
	
	
	
	
	
	
	
	//Test valid text value
	var karmaPattern = /((karma: <!)([a-z0-9]+)(> )(\+\+|\-\-))/g;
	
	if(!karmaPattern.test(text)){
		slackResponse = `Invalid: ${text} | Format Example: karma: @user ++`;
	}
	
	//var user = text.replace('karma:', '');
	
	var slackRes = new Slack();
	slackRes.setWebhook("https://hooks.slack.com/services/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");
	
	slackRes.webhook({
	  channel: "#" + channelName,
	  username: "webhookbot",
	  text: slackResponse + "   |||||| " + text
	}, (err, response) => {
	  console.log(response);
	});
});
//((karma: @)([a-z0-9]+ )(\+\+|\-\-))
app.listen(config.port, 
	() => console.log(`Running on port ${config.port}`));
