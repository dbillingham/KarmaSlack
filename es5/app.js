'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sourceMapSupport = require('source-map-support');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

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

var _es5ExpressServiceJs = require('../es5/express.service.js');

var _es5ExpressServiceJs2 = _interopRequireDefault(_es5ExpressServiceJs);

var _es5KarmaRouteJs = require('../es5/karma.route.js');

var _es5KarmaRouteJs2 = _interopRequireDefault(_es5KarmaRouteJs);

(0, _sourceMapSupport.install)();

var config = new _es5ConfigJs2['default']();

var mongooseService = new _es5MongooseServiceJs2['default'](config);
mongooseService.init();

var expressService = new _es5ExpressServiceJs2['default'](config);
var configService = new _es5ConfigServiceJs2['default']();
var slackService = new _es5SlackServiceJs2['default']();
var karmaService = new _es5KarmaServiceJs2['default']();
var karmaRoute = new _es5KarmaRouteJs2['default'](expressService, configService, slackService, karmaService);

//var app = Express();
//app.use(BodyParser.urlencoded({ extended: true }));

expressService.app.post('/karma2', function (req, res) {

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

	//let configService = new ConfigService();
	//let slackService = new SlackService();

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

expressService.run();
//# sourceMappingURL=app.js.map