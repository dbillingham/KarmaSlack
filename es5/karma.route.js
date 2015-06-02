'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var KarmaRoute = (function () {
	function KarmaRoute(expressService) {
		_classCallCheck(this, KarmaRoute);

		this._app = expressService.app;

		this._app.post('/karma2', function (req, res) {});
	}

	_createClass(KarmaRoute, [{
		key: 'run',
		value: function run() {}
	}, {
		key: 'app',
		get: function () {}
	}]);

	return KarmaRoute;
})();

exports['default'] = KarmaRoute;
;
module.exports = exports['default'];
//# sourceMappingURL=karma.route.js.map