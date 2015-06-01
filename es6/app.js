import { install as sourceMapSupportInstall } from 'source-map-support';
import Express from 'express';
import BodyParser from 'body-parser';
import Slack from 'slack-node';

import Config from '../es5/config.js'; 

import KarmaModel from '../es5/karma.model.js'; 
import ConfigModel from '../es5/config.model.js';
 
import MongooseService from '../es5/mongoose.service.js';
import KarmaService from '../es5/karma.service.js'; 
import ConfigService from '../es5/config.service.js'; 

sourceMapSupportInstall();

var app = Express();
app.use(BodyParser.urlencoded({ extended: true }));

var config = new Config();

var mongooseService = new MongooseService(config);
mongooseService.init();

var karmaService = new KarmaService();


//Karma commands
/*
karmaService.add("111", "DAN", "Craigssss").then((data)=>{
	
	console.log(data);
	
	karmaService.remove("111", "DAN", "ccc").then((data)=>{

		console.log(data);

		karmaService.userCount("111", "DAN")
			.then((data) => console.log(data));
			
		karmaService.teamCount("111")
			.then((data) => console.log(data));
	});
});
*/


//Regsiter

var configService = new ConfigService();

//karma: init https://hooks.slack.com/services/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


/*
var configModel = new ConfigModel({
	teamId: "12345",
	teamDomain: "dans teamss",
	inboundWebhook: "https://hooks.slack.com/services/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",
	outboundToken: "25LnEy4vXHEi88PlrLvg6htP"
});

configService.register(configModel)
	.then((data) => console.log(data))
	.catch((data) => console.log(data));


configService.register("12345","dans teamss","https://hooks.slack.com/services/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")
	.then((data) => console.log(data))
	.catch((data) => console.log(data));
*/

function parseJson(str){
		
	return new Promise((res,rej) =>{
		
		try{
			str = str.replace(/\\"/g, '');
			res(JSON.parse(str));
		}catch(e){
			rej();
		}
	});
}

function authenticate(teamId, token){
		
	return new Promise((res,rej)=>{
		
		let configService = new ConfigService();

		configService.getConfig(teamId)
			.then((data) => {

				if(!data){
					rej("No config found.");
				}

				if(token !== data.outboundToken){
					rej("Invalid token.");
				}
				
				res();				
			}).catch((err)=>{

				rej(err);
			});
	});
}

function sendResponse(slackData, message, res){
	
	if(!message){
		message = "Invalid Command. For help see; karma: ?";
	}
	
	res.send(message);
	
	let slackRes = new Slack();
	
	let teamConfig = configService.getConfig(slackData.teamId);
	
	teamConfig.inboundWebhook = "https://hooks.slack.com/services/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";
	
	if(teamConfig.inboundWebhook){
		
		slackRes.setWebhook(teamConfig.inboundWebhook);
	
		slackRes.webhook({
			
		  channel: "#" + slackData.channelName,
		  username: "karmabot",
		  text: message + ' | ' + teamConfig.inboundWebhook
		}, (err, response) => {
			
		  console.log(response);
		});
	}
}


app.post('/karma2',  (req, res) => {
	
	var configServiceA = new ConfigService();

	var slackData = {
		token: req.body.token,
		teamId: req.body.team_id,
		teamDomain: req.body.team_domain,
		channelId: req.body.channel_id,
		channelName: req.body.channel_name,
		timestamp: req.body.timestamp,
		userId: req.body.user_id,
		userName: req.body.user_name,
		originalText: req.body.text,
		text: req.body.text.replace(req.body.trigger_word, '').trim(),
		triggerWord: req.body.trigger_word
	};
	
	let jsonString = slackData.text.replace("init", '').trim();

let str = jsonString.replace(/\\"/g, "\"");
	let configModel = new ConfigModel({
				teamId: slackData.text,
				teamDomain: jsonString,
				inboundWebhook: str,
				outboundToken: "444"
			});
			
	configServiceA.register(configModel);	
	res.send("done");
	
	
	parseJson(jsonString)
		.then((data)=>{
			/*
				let configModel = new ConfigModel({
							teamId: slackData.text,
							teamDomain: jsonString,
							inboundWebhook: "333",
							outboundToken: "444"
						});
						
				configServiceA.register(configModel);	
				res.send("done");*/
			
			
			//console.log("data 1: " + data);
			/*let configModel = new ConfigModel({
				teamId: slackData.teamId,
				teamDomain: slackData.teamDomain,
				inboundWebhook: data.inboundWebhook || '',
				outboundToken: data.outboundToken || ''
			});

			configServiceA.register(configModel);*/
				/*.then((data) => {
					//console.log("data 2: " + data);
					//sendResponse(slackData, data, res);
				})
				.catch((data) => {
					//console.log("data 3: " + data);
					//sendResponse(slackData, data, res);
				});*/
				
		}).catch(()=>{
			//sendResponse(slackData, "Invalid init JSON. For help see; karma: ?", res);
		});
});


app.post('/karma',  (req, res) => {
	
	/*
	REQUEST
		token=XXXXXXXXXXXXXXXXXX
		team_id=T0001
		team_domain=example
		channel_id=C2147483705
		channel_name=test
		timestamp=1355517523.000005
		user_id=U2147483697
		user_name=Steve
		text=karma: <!everyone> ++
		trigger_word=karma:
	*/
	
	//Needs to be a class
	var slackData = {
		token: req.body.token,
		teamId: req.body.team_id,
		teamDomain: req.body.team_domain,
		channelId: req.body.channel_id,
		channelName: req.body.channel_name,
		timestamp: req.body.timestamp,
		userId: req.body.user_id,
		userName: req.body.user_name,
		originalText: req.body.text,
		text: req.body.text.replace(req.body.trigger_word, '').trim(),
		triggerWord: req.body.trigger_word
	};
	
	let configService = new ConfigService();
	
	let helpPattern = /(\?)/,
		initPattern = /((init \{)([\s\S]*)(\}))/,
		userNamePattern = /<!(.*?)>/,
		posPattern = /((<!)([a-z0-9]+)(> )(\+\+))/,
		negPattern = /((<!)([a-z0-9]+)(> )(\-\-))/;
	
	//Help

	if(helpPattern.test(slackData.text)){
		let slackResponse = "How to use karma:";
		slackResponse += "\n Positive karma = karma: @user ++";
		slackResponse += "\n Negative karma = karma: @user --";
		slackResponse += "\n User karma = karma: @user";
		slackResponse += "\n Team karma = karma: @everyone";
		slackResponse += "\n Setup karma = karma: init {";
		slackResponse += "\n  \"inboundWebhook\": \"https://hooks.slack.com/services/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\"";
		slackResponse += "\n  \"outboundToken\": \"25LnEy4vXHEi88Plrpvg6htP";
		slackResponse += "\n }";
		sendResponse(slackData, slackResponse, res);
	}
	
	//Init
	
	if(initPattern.test(slackData.text)){
		
		let configJsonString = slackData.text.replace(": init", '').trim();
		
		parseJson(configJsonString)
			.then((data)=>{

				//Remove the '<>' from the inbound webhook that slack seems to add around urls.
				data.inboundWebhook = data.inboundWebhook.replace(/<|>/g,'');

				let configModel = new ConfigModel({
					teamId: slackData.teamId,
					teamDomain: slackData.teamDomain,
					inboundWebhook: data.inboundWebhook || '',
					outboundToken: data.outboundToken || ''
				});

				configService.register(configModel)
					.then((data) => {

						sendResponse(slackData, data, res);
					})
					.catch((data) => {

						sendResponse(slackData, data, res);
					});
					
			}).catch(()=>{
				sendResponse(slackData, "Invalid init JSON. For help see; karma: ?", res);
			});
	}
	
	//Positive karma
	
	if(posPattern.test(slackData.text)){
		
		authenticate(slackData.teamId, slackData.token).then(()=>{

			let userName = userNamePattern.exec(slackData.text)[1];
			
			karmaService.add(slackData.teamId, userName, slackData.userName)
				.then((data)=>{			
					sendResponse(slackData, data, res);
				});
				
		}).catch((err)=>{
			
			sendResponse(slackData, err, res);
		});
	}
	
	//Negative karma
	
	if(negPattern.test(slackData.text)){
		
		authenticate(slackData.teamId, slackData.token).then(()=>{

			let userName = userNamePattern.exec(slackData.text)[1];
			
			karmaService.remove(slackData.teamId, userName, slackData.userName)
				.then((data)=>{			
					sendResponse(slackData, data, res);
				});
				
		}).catch((err)=>{
			
			sendResponse(slackData, err, res);
		});
	}
	
	//User Total
	
	if(userNamePattern.test(slackData.text)){
		
		authenticate(slackData.teamId, slackData.token).then(()=>{
			
			let userName = userNamePattern.exec(slackData.text)[1];
			
			if(userName === 'everyone'){
				
				karmaService.teamCount(slackData.teamId)
					.then((data)=>{			
						sendResponse(slackData, data, res);
					});				
			}else{
				
				karmaService.userCount(slackData.teamId, userName)
					.then((data)=>{			
						sendResponse(slackData, data, res);
					});
			}
				
		}).catch((err)=>{
			
			sendResponse(slackData, err, res);
		});
	}
});

app.listen(config.port, 
	() => console.log(`Running on port ${config.port}`));
