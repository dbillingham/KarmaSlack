'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var KarmaRoute = (function () {
	function KarmaRoute(expressService, configService, slackService) {
		_classCallCheck(this, KarmaRoute);

		this._app = expressService.app;
		this._configService = configService;
		this._slackService = slackService;
		this._init();
	}

	_createClass(KarmaRoute, [{
		key: '_init',
		value: function _init() {
			var _this = this;

			this._app.post('/karma', function (req, res) {

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

				var helpPattern = /(\?)/,
				    initPattern = /((init \{)([\s\S]*)(\}))/,
				    userIdPattern = /<@(.*?)>/,
				    userIdSinglePattern = /^<@(.*?)>$/,
				    teamIdPattern = /<!everyone>/,
				    posPattern = /((<@)(.*)(> )(\+\+))/,
				    negPattern = /((<@)(.*)(> )(\-\-))/;

				//Help

				if (helpPattern.test(slackData.text)) {
					_this._helpCommand(slackData, res);
				}

				//Init

				if (initPattern.test(slackData.text)) {
					_this._initCommand(slackData, res);
				}
			});
		}
	}, {
		key: '_helpCommand',
		value: function _helpCommand(slackData, res) {
			var slackResponse = 'How to use karma:';
			slackResponse += '\n Positive karma = karma: @user ++';
			slackResponse += '\n Negative karma = karma: @user --';
			slackResponse += '\n User karma = karma: @user';
			slackResponse += '\n Team karma = karma: @everyone';
			slackResponse += '\n Setup karma = karma: init {';
			slackResponse += '\n  "inboundWebhook": "https://hooks.slack.com/services/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",';
			slackResponse += '\n  "outboundToken": "25LnEy4vXHEi88Plrpvg6htP';
			slackResponse += '\n }';
			this._slackService.sendResponse(slackData, slackResponse, res);
		}
	}, {
		key: '_initCommand',
		value: function _initCommand(slackData, res) {
			var _this2 = this;

			var configJsonString = slackData.text.replace('init', '').trim();

			this._slackService.parseJson(configJsonString).then(function (data) {

				//Remove the '<>' from the inbound webhook that slack seems to add around urls.
				data.inboundWebhook = data.inboundWebhook.replace(/<|>/g, '');

				var configModel = new ConfigModel({
					teamId: slackData.teamId,
					teamDomain: slackData.teamDomain,
					//apiToken: data.apiToken || ''
					inboundWebhook: data.inboundWebhook || '',
					outboundToken: data.outboundToken || ''
				});

				configService.register(configModel).then(function (data) {

					_this2._slackService.sendResponse(slackData, data, res);
				})['catch'](function (data) {

					_this2._slackService.sendResponse(slackData, data, res);
				});
			})['catch'](function () {
				_this2._slackService.sendResponse(slackData, 'Invalid init JSON. For help see; karma: ?', res);
			});
		}
	}]);

	return KarmaRoute;
})();

exports['default'] = KarmaRoute;
;
module.exports = exports['default'];
//# sourceMappingURL=karma.route.js.map