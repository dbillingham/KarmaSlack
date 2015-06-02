import { install as sourceMapSupportInstall } from 'source-map-support';
import Express from 'express';


import Config from '../es5/config.js'; 

import KarmaModel from '../es5/karma.model.js'; 
import ConfigModel from '../es5/config.model.js';
 
import MongooseService from '../es5/mongoose.service.js';
import KarmaService from '../es5/karma.service.js'; 
import ConfigService from '../es5/config.service.js'; 
import SlackService from '../es5/slack.service.js'; 
import ExpressService from '../es5/express.service.js'; 

import KarmaRoute from '../es5/karma.route.js'; 

sourceMapSupportInstall();

var config = new Config();

var expressService = new ExpressService(config);

var karmaRoute = new KarmaRoute(expressService);

//var app = Express();
//app.use(BodyParser.urlencoded({ extended: true }));



var mongooseService = new MongooseService(config);
mongooseService.init();

var karmaService = new KarmaService();

expressService.app.post('/karma',  (req, res) => {
	
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
		text: req.body.text.replace(req.body.trigger_word + ':', '').trim(),
		triggerWord: req.body.trigger_word
	};
	
	let configService = new ConfigService();
	let slackService = new SlackService();
	
	let helpPattern = /(\?)/,
		initPattern = /((init \{)([\s\S]*)(\}))/,
		userIdPattern = /<@(.*?)>/,
		userIdSinglePattern = /^<@(.*?)>$/,
		teamIdPattern = /<!everyone>/,
		posPattern = /((<@)(.*)(> )(\+\+))/,
		negPattern = /((<@)(.*)(> )(\-\-))/;
	
	//Help

	if(helpPattern.test(slackData.text)){
		let slackResponse = "How to use karma:";
		slackResponse += "\n Positive karma = karma: @user ++";
		slackResponse += "\n Negative karma = karma: @user --";
		slackResponse += "\n User karma = karma: @user";
		slackResponse += "\n Team karma = karma: @everyone";
		slackResponse += "\n Setup karma = karma: init {";
		slackResponse += "\n  \"inboundWebhook\": \"https://hooks.slack.com/services/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\",";
		slackResponse += "\n  \"outboundToken\": \"25LnEy4vXHEi88Plrpvg6htP";
		slackResponse += "\n }";
		slackService.sendResponse(slackData, slackResponse, res);
	}
	
	//Init
	
	if(initPattern.test(slackData.text)){
		
		let configJsonString = slackData.text.replace("init", '').trim();
		
		slackService.parseJson(configJsonString)
			.then((data)=>{

				//Remove the '<>' from the inbound webhook that slack seems to add around urls.
				data.inboundWebhook = data.inboundWebhook.replace(/<|>/g,'');

				let configModel = new ConfigModel({
					teamId: slackData.teamId,
					teamDomain: slackData.teamDomain,
					//apiToken: data.apiToken || ''
					inboundWebhook: data.inboundWebhook || '',
					outboundToken: data.outboundToken || ''					
				});

				configService.register(configModel)
					.then((data) => {

						slackService.sendResponse(slackData, data, res);
					})
					.catch((data) => {

						slackService.sendResponse(slackData, data, res);
					});
					
			}).catch(()=>{
				slackService.sendResponse(slackData, "Invalid init JSON. For help see; karma: ?", res);
			});
	}
	
	//Positive karma

	if(posPattern.test(slackData.text)){
		
		slackService.authenticate(slackData.teamId, slackData.token).then(()=>{

			let userId = userIdPattern.exec(slackData.text)[1];
			
			karmaService.add(slackData.teamId, userId, slackData.userId)
				.then((data)=>{			
					slackService.sendResponse(slackData, data, res);
				});
				
		}).catch((err)=>{
			
			slackService.sendResponse(slackData, err, res);
		});
	}
	
	//Negative karma
	
	if(negPattern.test(slackData.text)){
		
		slackService.authenticate(slackData.teamId, slackData.token).then(()=>{

			let userId = userIdPattern.exec(slackData.text)[1];
			
			karmaService.remove(slackData.teamId, userId, slackData.userId)
				.then((data)=>{			
					slackService.sendResponse(slackData, data, res);
				});
				
		}).catch((err)=>{
			
			slackService.sendResponse(slackData, err, res);
		});
	}
	
	//User Total
	
	if(userIdSinglePattern.test(slackData.text)){
		
		slackService.authenticate(slackData.teamId, slackData.token).then(()=>{
			
			let userId = userIdPattern.exec(slackData.text)[1];
			
			karmaService.userCount(slackData.teamId, userId)
				.then((data)=>{			
					slackService.sendResponse(slackData, data, res);
				});
				
		}).catch((err)=>{
			
			slackService.sendResponse(slackData, err, res);
		});
	}
	
	//Team Total
	
	if(teamIdPattern.test(slackData.text)){
		
		slackService.authenticate(slackData.teamId, slackData.token).then(()=>{
			
			let userId = teamIdPattern.exec(slackData.text)[1];
			
			karmaService.teamCount(slackData.teamId)
				.then((data)=>{			
					slackService.sendResponse(slackData, data, res);
				});
				
		}).catch((err)=>{
			
			slackService.sendResponse(slackData, err, res);
		});
	}
});

expressService.run();