'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

var SlackService = (function () {
	function SlackService(configService) {
		_classCallCheck(this, SlackService);

		this._configService = configService;
	}

	_createClass(SlackService, [{
		key: 'parseJson',

		//Parse json data

		value: function parseJson(str) {

			return new Promise(function (res, rej) {
				console.log(str);
				try {
					str = str.replace(/\\"/g, '');
					res(JSON.parse(str));
				} catch (e) {
					rej();
				}
			});
		}
	}, {
		key: 'authenticate',

		//Authenticate request

		value: function authenticate(teamId, token) {
			var _this = this;

			return new Promise(function (res, rej) {

				_this._configService.getConfig(teamId).then(function (data) {

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
	}, {
		key: 'sendResponse',

		//Send slack response

		value: function sendResponse(slackData, message, res) {

			if (!message) {
				message = 'Invalid Command. For help see; karma: ?';
			}

			//res.send(message);
			//return;

			var slackRes = new _slackNode2['default']();

			this._configService.getConfig(slackData.teamId).then(function (data) {

				//data.inboundWebhook = "https://hooks.slack.com/services/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";

				if (data.inboundWebhook) {

					slackRes.setWebhook(data.inboundWebhook);

					slackRes.webhook({

						channel: '#' + slackData.channelName,
						username: 'karmabot',
						text: message
					}, function (err, response) {

						console.log(response);
					});
				}
			});
		}
	}]);

	return SlackService;
})();

exports['default'] = SlackService;
module.exports = exports['default'];
//# sourceMappingURL=../core/slack.service.js.map