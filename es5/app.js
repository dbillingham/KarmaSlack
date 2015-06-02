'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sourceMapSupport = require('source-map-support');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

var _es5ConfigJs = require('../es5/config.js');

var _es5ConfigJs2 = _interopRequireDefault(_es5ConfigJs);

var _es5KarmaModelJs = require('../es5/karma.model.js');

var _es5KarmaModelJs2 = _interopRequireDefault(_es5KarmaModelJs);

var _es5ConfigModelJs = require('../es5/config.model.js');

var _es5ConfigModelJs2 = _interopRequireDefault(_es5ConfigModelJs);

var _es5MongooseServiceJs = require('../es5/mongoose.service.js');

var _es5MongooseServiceJs2 = _interopRequireDefault(_es5MongooseServiceJs);

var _es5KarmaServiceJs = require('../es5/karma.service.js');

var _es5KarmaServiceJs2 = _interopRequireDefault(_es5KarmaServiceJs);

var _es5ConfigServiceJs = require('../es5/config.service.js');

var _es5ConfigServiceJs2 = _interopRequireDefault(_es5ConfigServiceJs);

var _es5SlackServiceJs = require('../es5/slack.service.js');

var _es5SlackServiceJs2 = _interopRequireDefault(_es5SlackServiceJs);

(0, _sourceMapSupport.install)();

var app = (0, _express2['default'])();
app.use(_bodyParser2['default'].urlencoded({ extended: true }));

var config = new _es5ConfigJs2['default']();

var mongooseService = new _es5MongooseServiceJs2['default'](config);
mongooseService.init();

var karmaService = new _es5KarmaServiceJs2['default']();

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

/*
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
					rej("Invalid token. " + token + ' | ' + data.outboundToken);
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
	
	//res.send(message);
	
	let slackRes = new Slack();
	
	configService.getConfig(slackData.teamId).then((data)=>{
		
		//data.inboundWebhook = "https://hooks.slack.com/services/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";
		
		if(data.inboundWebhook){
			
			slackRes.setWebhook(data.inboundWebhook);
		
			slackRes.webhook({
				
			  channel: "#" + slackData.channelName,
			  username: "karmabot",
			  text: message
			}, (err, response) => {
				
			  console.log(response);
			});
		}
	});
}
*/
app.post('/karma', function (req, res) {

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

	var configService = new _es5ConfigServiceJs2['default']();
	var slackService = new _es5SlackServiceJs2['default']();

	var helpPattern = /(\?)/,
	    initPattern = /((init \{)([\s\S]*)(\}))/,
	    userIdPattern = /<@(.*?)>/,
	    userIdSinglePattern = /^<@(.*?)>$/,
	    teamIdPattern = /<!everyone>/,
	    posPattern = /((<@)(.*)(> )(\+\+))/,
	    negPattern = /((<@)(.*)(> )(\-\-))/;

	//Help

	if (helpPattern.test(slackData.text)) {
		var slackResponse = 'How to use karma:';
		slackResponse += '\n Positive karma = karma: @user ++';
		slackResponse += '\n Negative karma = karma: @user --';
		slackResponse += '\n User karma = karma: @user';
		slackResponse += '\n Team karma = karma: @everyone';
		slackResponse += '\n Setup karma = karma: init {';
		slackResponse += '\n  "inboundWebhook": "https://hooks.slack.com/services/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",';
		slackResponse += '\n  "outboundToken": "25LnEy4vXHEi88Plrpvg6htP';
		slackResponse += '\n }';
		slackService.sendResponse(slackData, slackResponse, res);
	}

	//Init

	if (initPattern.test(slackData.text)) {

		var configJsonString = slackData.text.replace('init', '').trim();

		slackService.parseJson(configJsonString).then(function (data) {

			//Remove the '<>' from the inbound webhook that slack seems to add around urls.
			data.inboundWebhook = data.inboundWebhook.replace(/<|>/g, '');

			var configModel = new _es5ConfigModelJs2['default']({
				teamId: slackData.teamId,
				teamDomain: slackData.teamDomain,
				//apiToken: data.apiToken || ''
				inboundWebhook: data.inboundWebhook || '',
				outboundToken: data.outboundToken || ''
			});

			configService.register(configModel).then(function (data) {

				slackService.sendResponse(slackData, data, res);
			})['catch'](function (data) {

				slackService.sendResponse(slackData, data, res);
			});
		})['catch'](function () {
			slackService.sendResponse(slackData, 'Invalid init JSON. For help see; karma: ?', res);
		});
	}

	//Positive karma

	if (posPattern.test(slackData.text)) {

		slackService.authenticate(slackData.teamId, slackData.token).then(function () {

			var userId = userIdPattern.exec(slackData.text)[1];

			karmaService.add(slackData.teamId, userId, slackData.userId).then(function (data) {
				slackService.sendResponse(slackData, data, res);
			});
		})['catch'](function (err) {

			slackService.sendResponse(slackData, err, res);
		});
	}

	//Negative karma

	if (negPattern.test(slackData.text)) {

		slackService.authenticate(slackData.teamId, slackData.token).then(function () {

			var userId = userIdPattern.exec(slackData.text)[1];

			karmaService.remove(slackData.teamId, userId, slackData.userId).then(function (data) {
				slackService.sendResponse(slackData, data, res);
			});
		})['catch'](function (err) {

			slackService.sendResponse(slackData, err, res);
		});
	}

	//User Total

	if (userIdSinglePattern.test(slackData.text)) {

		slackService.authenticate(slackData.teamId, slackData.token).then(function () {

			var userId = userIdPattern.exec(slackData.text)[1];

			karmaService.userCount(slackData.teamId, userId).then(function (data) {
				slackService.sendResponse(slackData, data, res);
			});
		})['catch'](function (err) {

			slackService.sendResponse(slackData, err, res);
		});
	}

	//Team Total

	if (teamIdPattern.test(slackData.text)) {

		slackService.authenticate(slackData.teamId, slackData.token).then(function () {

			var userId = teamIdPattern.exec(slackData.text)[1];

			karmaService.teamCount(slackData.teamId).then(function (data) {
				slackService.sendResponse(slackData, data, res);
			});
		})['catch'](function (err) {

			slackService.sendResponse(slackData, err, res);
		});
	}
});

app.listen(config.port, function () {
	return console.log('Running on port ' + config.port);
});
//# sourceMappingURL=app.js.map