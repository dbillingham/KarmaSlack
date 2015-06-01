'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseClassWrapper = require('mongoose-class-wrapper');

var _mongooseClassWrapper2 = _interopRequireDefault(_mongooseClassWrapper);

var configSchema = _mongoose2['default'].Schema({
	teamId: String,
	teamDomain: String,
	inboundWebhook: String,
	outboundToken: String,
	apiToken: String,
	created: { type: Date, 'default': Date.now }
});

var ConfigModel = (function () {
	function ConfigModel() {
		_classCallCheck(this, ConfigModel);
	}

	_createClass(ConfigModel, null, [{
		key: 'update',
		value: function update(data) {

			/*
   	We have to remove the newly assigned _id as mongo wont update
   	when a model has a differnet _id
   */

			data = data.toObject();
			delete data['_id'];

			return this.findOneAndUpdate({ 'teamId': data.teamId }, data, { upsert: true });
		}
	}]);

	return ConfigModel;
})();

configSchema.plugin(_mongooseClassWrapper2['default'], ConfigModel);

exports['default'] = _mongoose2['default'].model('Config', configSchema);
module.exports = exports['default'];
//# sourceMappingURL=config.model.js.map