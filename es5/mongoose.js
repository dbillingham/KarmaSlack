'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _es5KarmaModelJs = require('../es5/karma.model.js');

var _es5KarmaModelJs2 = _interopRequireDefault(_es5KarmaModelJs);

var InitMongoose =
/*
constructor(config) {
	this._config = config;
}

init(){
	Mongoose.connect(this._config.db);
	
	var db = Mongoose.connection;
	
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback(){
		console.log('db opened');
	});
}
*/

function InitMongoose(config) {
	_classCallCheck(this, InitMongoose);

	_mongoose2['default'].connect(config.db);

	var db = _mongoose2['default'].connection;

	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('db opened');
	});
}

//Contact.find({}).remove().exec();
/*
Contact.find({}).exec(function(err, collection){
	if(Contact.length === 0){
        Contact.create({
          "name":"Joe Bloggs",
          "ext":"0001",
          "mobile":"07538743168"
        });								
	}
});*/
;

exports['default'] = InitMongoose;
;
module.exports = exports['default'];
//# sourceMappingURL=mongoose.js.map