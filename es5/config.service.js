'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _es5ConfigModelJs = require('../es5/config.model.js');

var _es5ConfigModelJs2 = _interopRequireDefault(_es5ConfigModelJs);

var ConfigService = (function () {
	function ConfigService() {
		_classCallCheck(this, ConfigService);
	}

	_createClass(ConfigService, [{
		key: 'register',
		value: function register(config) {

			return new Promise(function (res, rej) {

				_es5ConfigModelJs2['default'].update(config).then(function () {

					res('Karma config for ' + config.teamDomain + ' updated.');
				})['catch'](function (e) {

					rej('Error inserting/updating Karma config for ' + config.teamDomain + '.');
				});
			});
		}
	}, {
		key: 'getConfig',
		value: function getConfig(teamId) {
			return _es5ConfigModelJs2['default'].findOne({ teamId: teamId });
		}
	}]);

	return ConfigService;
})();

exports['default'] = ConfigService;
module.exports = exports['default'];
//# sourceMappingURL=config.service.js.map