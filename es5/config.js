'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Config = (function () {
	function Config() {
		_classCallCheck(this, Config);

		this._env = process.env.NODE_ENV || 'development';
	}

	_createClass(Config, [{
		key: 'db',
		get: function () {
			return this._env === 'development' ? 'mongodb://localhost/karma' : 'mongodb://trunk:trunk@ds063889.mongolab.com:63889/karma';
		}
	}, {
		key: 'port',
		get: function () {

			if (process.env.PORT) {
				return process.env.PORT;
			}

			return this._env === 'development' ? '3000' : 80;
		}
	}]);

	return Config;
})();

exports['default'] = Config;
module.exports = exports['default'];
//# sourceMappingURL=config.js.map