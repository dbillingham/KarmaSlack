'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _configConfigModelJs = require('../config/config.model.js');

var _configConfigModelJs2 = _interopRequireDefault(_configConfigModelJs);

var _coreKarmaregexJs = require('../core/karmaregex.js');

var _coreKarmaregexJs2 = _interopRequireDefault(_coreKarmaregexJs);

var KarmaRoute = (function () {
	function KarmaRoute(expressService, configService, slackService, karmaService) {
		_classCallCheck(this, KarmaRoute);

		this._app = expressService.app;
		this._configService = configService;
		this._slackService = slackService;
		this._karmaService = karmaService;
		this._init();
	}

	_createClass(KarmaRoute, [{
		key: '_init',
		value: function _init() {
			var _this = this;

			this._app.post('/karma2', function (req, res) {
				res.send('ssss');
			});
			return;

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

				//Help

				if (_coreKarmaregexJs2['default'].helpPattern.test(slackData.text)) {
					_this._helpCommand(slackData, res);
				}

				//Init

				if (_coreKarmaregexJs2['default'].initPattern.test(slackData.text)) {
					_this._initCommand(slackData, res);
				}

				//Positive karma

				if (_coreKarmaregexJs2['default'].posPattern.test(slackData.text)) {
					_this._posCommand(slackData, res);
				}

				//Negative karma

				if (_coreKarmaregexJs2['default'].negPattern.test(slackData.text)) {
					_this._negCommand(slackData, res);
				}

				//User Total

				if (_coreKarmaregexJs2['default'].userIdSinglePattern.test(slackData.text)) {
					_this._userTotalCommand(slackData, res);
				}

				//Team Total

				if (_coreKarmaregexJs2['default'].teamIdPattern.test(slackData.text)) {
					_this._teamTotalCommand(slackData, res);
				}
			});
		}
	}, {
		key: '_helpCommand',
		value: function _helpCommand(slackData, res) {
			var slackResponse = 'How to use karma:';
			slackResponse += '\n Positive karma = ' + slackData.triggerWord + ': @user ++';
			slackResponse += '\n Negative karma = ' + slackData.triggerWord + ': @user --';
			slackResponse += '\n User karma = ' + slackData.triggerWord + ': @user';
			slackResponse += '\n Team karma = ' + slackData.triggerWord + ': @everyone';
			slackResponse += '\n Setup karma = ' + slackData.triggerWord + ': init {';
			slackResponse += '\n  "incomingWebhookUrl": "https://hooks.slack.com/services/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",';
			slackResponse += '\n  "outgoingToken": "25LnEy4vXHEi88Plrpvg6htP"';
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
				data.incomingWebhookUrl = data.incomingWebhookUrl.replace(/<|>/g, '');

				var configModel = new _configConfigModelJs2['default']({
					teamId: slackData.teamId,
					teamDomain: slackData.teamDomain,
					//apiToken: data.apiToken || ''
					incomingWebhookUrl: data.incomingWebhookUrl || '',
					outgoingToken: data.outgoingToken || ''
				});

				_this2._configService.register(configModel).then(function (data) {

					_this2._slackService.sendResponse(slackData, data, res);
				})['catch'](function (data) {

					_this2._slackService.sendResponse(slackData, data, res);
				});
			})['catch'](function () {
				_this2._slackService.sendResponse(slackData, 'Invalid init JSON. For help see; ' + slackData.triggerWord + ': ?', res);
			});
		}
	}, {
		key: '_posCommand',
		value: function _posCommand(slackData, res) {
			var _this3 = this;

			this._slackService.authenticate(slackData.teamId, slackData.token).then(function () {

				var userId = _coreKarmaregexJs2['default'].userIdPattern.exec(slackData.text)[1];

				_this3._karmaService.add(slackData.teamId, userId, slackData.userId).then(function (data) {
					_this3._slackService.sendResponse(slackData, data, res);
				})['catch'](function (err) {
					_this3._slackService.sendResponse(slackData, err, res);
				});
			})['catch'](function (err) {
				_this3._slackService.sendResponse(slackData, err, res);
			});
		}
	}, {
		key: '_negCommand',
		value: function _negCommand(slackData, res) {
			var _this4 = this;

			this._slackService.authenticate(slackData.teamId, slackData.token).then(function () {

				var userId = _coreKarmaregexJs2['default'].userIdPattern.exec(slackData.text)[1];

				_this4._karmaService.remove(slackData.teamId, userId, slackData.userId).then(function (data) {
					_this4._slackService.sendResponse(slackData, data, res);
				});
			})['catch'](function (err) {
				_this4._slackService.sendResponse(slackData, err, res);
			});
		}
	}, {
		key: '_userTotalCommand',
		value: function _userTotalCommand(slackData, res) {
			var _this5 = this;

			this._slackService.authenticate(slackData.teamId, slackData.token).then(function () {

				var userId = _coreKarmaregexJs2['default'].userIdPattern.exec(slackData.text)[1];

				_this5._karmaService.userCount(slackData.teamId, userId).then(function (data) {
					_this5._slackService.sendResponse(slackData, data, res);
				});
			})['catch'](function (err) {
				_this5._slackService.sendResponse(slackData, err, res);
			});
		}
	}, {
		key: '_teamTotalCommand',
		value: function _teamTotalCommand(slackData, res) {
			var _this6 = this;

			this._slackService.authenticate(slackData.teamId, slackData.token).then(function () {

				_this6._karmaService.teamCount(slackData.teamId).then(function (data) {
					_this6._slackService.sendResponse(slackData, data, res);
				});
			})['catch'](function (err) {
				_this6._slackService.sendResponse(slackData, err, res);
			});
		}
	}]);

	return KarmaRoute;
})();

exports['default'] = KarmaRoute;
;
module.exports = exports['default'];
//# sourceMappingURL=../karma/karma.route.js.map