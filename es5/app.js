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

var configService = new _es5ConfigServiceJs2['default']();

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

function parseJson(str) {

	return new Promise(function (res, rej) {

		try {
			str = str.replace(/\\"/g, '');
			res(JSON.parse(str));
		} catch (e) {
			rej();
		}
	});
}

function authenticate(teamId, token) {

	return new Promise(function (res, rej) {

		var configService = new _es5ConfigServiceJs2['default']();

		configService.getConfig(teamId).then(function (data) {

			if (!data) {
				rej('No config found.');
			}

			if (token !== data.outboundToken) {
				rej('Invalid token.');
			}

			res();
		})['catch'](function (err) {

			rej(err);
		});
	});
}

function sendResponse(slackData, message, res) {

	if (!message) {
		message = 'Invalid Command. For help see; karma: ?';
	}

	res.send(message);

	var slackRes = new _slackNode2['default']();

	var teamConfig = configService.getConfig(slackData.teamId);

	teamConfig.outboundWebhook = 'https://hooks.slack.com/services/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';

	if (teamConfig.outboundWebhook) {

		slackRes.setWebhook(teamConfig.outboundWebhook);

		slackRes.webhook({

			channel: '#' + slackData.channelName,
			username: 'karmabot',
			text: message
		}, function (err, response) {

			console.log(response);
		});
	}
}

app.post('/karma2', function (req, res) {

	var configServiceA = new _es5ConfigServiceJs2['default']();

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

	var jsonString = slackData.text.replace('init', '').trim();

	var str = jsonString.replace(/\\"/g, '"');
	var configModel = new _es5ConfigModelJs2['default']({
		teamId: slackData.text,
		teamDomain: jsonString,
		inboundWebhook: str,
		outboundToken: '444'
	});

	configServiceA.register(configModel);
	res.send('done');

	parseJson(jsonString).then(function (data) {})['catch'](function () {});
});

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
		text: req.body.text.replace(req.body.trigger_word, '').trim(),
		triggerWord: req.body.trigger_word
	};

	var configService = new _es5ConfigServiceJs2['default']();

	var helpPattern = /(\?)/,
	    initPattern = /((init \{)([\s\S]*)(\}))/,
	    userNamePattern = /<!(.*?)>/,
	    posPattern = /((<!)([a-z0-9]+)(> )(\+\+))/,
	    negPattern = /((<!)([a-z0-9]+)(> )(\-\-))/;

	//Help

	if (helpPattern.test(slackData.text)) {
		var slackResponse = 'How to use karma:';
		slackResponse += '\n Positive karma = karma: @user ++';
		slackResponse += '\n Negative karma = karma: @user --';
		slackResponse += '\n User karma = karma: @user';
		slackResponse += '\n Team karma = karma: @everyone';
		slackResponse += '\n Setup karma = karma: init {';
		slackResponse += '\n  "inboundWebhook": "https://hooks.slack.com/services/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"';
		slackResponse += '\n  "outboundToken": "25LnEy4vXHEi88Plrpvg6htP';
		slackResponse += '\n }';
		sendResponse(slackData, slackResponse, res);
	}

	//Init

	if (initPattern.test(slackData.text)) {

		var configJsonString = slackData.text.replace(': init', '').trim();

		parseJson(configJsonString).then(function (data) {

			//Remove the '<>' from the inbound webhook that slack seems to add around urls.
			data.inboundWebhook = data.inboundWebhook.replace(/<|>/g, '');

			var configModel = new _es5ConfigModelJs2['default']({
				teamId: slackData.teamId,
				teamDomain: slackData.teamDomain,
				inboundWebhook: data.inboundWebhook || '',
				outboundToken: data.outboundToken || ''
			});

			configService.register(configModel).then(function (data) {

				sendResponse(slackData, data, res);
			})['catch'](function (data) {

				sendResponse(slackData, data, res);
			});
		})['catch'](function () {
			sendResponse(slackData, 'Invalid init JSON. For help see; karma: ?', res);
		});
	}

	//Positive karma

	if (posPattern.test(slackData.text)) {

		authenticate(slackData.teamId, slackData.token).then(function () {

			var userName = userNamePattern.exec(slackData.text)[1];

			karmaService.add(slackData.teamId, userName, slackData.userName).then(function (data) {
				sendResponse(slackData, data, res);
			});
		})['catch'](function (err) {

			sendResponse(slackData, err, res);
		});
	}

	//Negative karma

	if (negPattern.test(slackData.text)) {

		authenticate(slackData.teamId, slackData.token).then(function () {

			var userName = userNamePattern.exec(slackData.text)[1];

			karmaService.remove(slackData.teamId, userName, slackData.userName).then(function (data) {
				sendResponse(slackData, data, res);
			});
		})['catch'](function (err) {

			sendResponse(slackData, err, res);
		});
	}

	//User Total

	if (userNamePattern.test(slackData.text)) {

		authenticate(slackData.teamId, slackData.token).then(function () {

			var userName = userNamePattern.exec(slackData.text)[1];

			if (userName === 'everyone') {

				karmaService.teamCount(slackData.teamId).then(function (data) {
					sendResponse(slackData, data, res);
				});
			} else {

				karmaService.userCount(slackData.teamId, userName).then(function (data) {
					sendResponse(slackData, data, res);
				});
			}
		})['catch'](function (err) {

			sendResponse(slackData, err, res);
		});
	}
});

app.listen(config.port, function () {
	return console.log('Running on port ' + config.port);
});

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

//sendResponse(slackData, "Invalid init JSON. For help see; karma: ?", res);
//# sourceMappingURL=app.js.map