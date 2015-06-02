'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var ExpressService = (function () {
	function ExpressService(config) {
		_classCallCheck(this, ExpressService);

		this._config = config;
		this._app = (0, _express2['default'])();
		this._app.use(_bodyParser2['default'].urlencoded({ extended: true }));
	}

	_createClass(ExpressService, [{
		key: 'run',
		value: function run() {
			var _this = this;

			this._app.listen(this._config.port, function () {
				return console.log('Running on port ' + _this._config.port);
			});
		}
	}, {
		key: 'app',
		get: function () {
			return this._app;
		}
	}]);

	return ExpressService;
})();

exports['default'] = ExpressService;
;
module.exports = exports['default'];
//# sourceMappingURL=express.service.js.map