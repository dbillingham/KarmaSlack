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

//import { mongoose } from 'mongoose';

(0, _sourceMapSupport.install)();

var app = (0, _express2['default'])();

var config = new _es5ConfigJs2['default']();

app.use(_bodyParser2['default'].urlencoded({ extended: true }));

app.post('/test', function (req, res) {

	var channelName = req.body.channel_name;

	var slackRes = new _slackNode2['default']();
	slackRes.setWebhook('https://hooks.slack.com/services/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');

	slackRes.webhook({
		channel: '#' + channelName,
		username: 'webhookbot',
		text: 'This is posted to #general and comes from a bot named webhookbot. '
	}, function (err, response) {
		console.log(response);
	});
});

app.listen(config.port, function () {
	return console.log('Running on port ' + config.port);
});
//# sourceMappingURL=app.js.map