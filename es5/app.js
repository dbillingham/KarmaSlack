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

var _es5KarmamongooseJs = require('../es5/karmamongoose.js');

var _es5KarmamongooseJs2 = _interopRequireDefault(_es5KarmamongooseJs);

var _es5KarmaModelJs = require('../es5/karma.model.js');

var _es5KarmaModelJs2 = _interopRequireDefault(_es5KarmaModelJs);

(0, _sourceMapSupport.install)();

var app = (0, _express2['default'])();
app.use(_bodyParser2['default'].urlencoded({ extended: true }));

var config = new _es5ConfigJs2['default']();

var karmaMongoose = new _es5KarmamongooseJs2['default'](config);
karmaMongoose.init();

var add = function add(teamId, userName) {

	return _es5KarmaModelJs2['default'].create({
		'teamId': teamId,
		'userName': userName }).then(function () {

		return userCount(teamId, userName, 'increased');
	});
};

var remove = function remove(teamId, userName) {

	return _es5KarmaModelJs2['default'].deleteLatestPoint(teamId, userName).then(function () {

		return userCount(teamId, userName, 'decreased');
	});
};

var userCount = function userCount(teamId, userName, incDec) {

	return _es5KarmaModelJs2['default'].points(teamId, userName).then(function (collection) {
		var response = '' + userName + ' has a karma of ' + collection.length + '!';

		if (incDec) {
			response = '' + userName + 's karma has ' + incDec + ' to ' + collection.length + '!';
		}

		console.log(response);
	});
};

add('111', 'DAN').then(function () {

	remove('111', 'DAN').then(function () {

		userCount('111', 'DAN');
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

var teamCount = function teamCount(teamId, userName) {};

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

app.post('/test', function (req, res) {

	var channelName = req.body.channel_name;
	var text = req.body.text;
	var slackResponse = 'Response: ' + text;

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

	if (!karmaPattern.test(text)) {
		slackResponse = 'Invalid: ' + text + ' | Format Example: karma: @user ++';
	}

	//var user = text.replace('karma:', '');

	var slackRes = new _slackNode2['default']();
	slackRes.setWebhook('https://hooks.slack.com/services/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');

	slackRes.webhook({
		channel: '#' + channelName,
		username: 'webhookbot',
		text: slackResponse + '   |||||| ' + text
	}, function (err, response) {
		console.log(response);
	});
});
//((karma: @)([a-z0-9]+ )(\+\+|\-\-))
app.listen(config.port, function () {
	return console.log('Running on port ' + config.port);
});
//# sourceMappingURL=app.js.map