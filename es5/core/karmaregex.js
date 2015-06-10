"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KarmaRegex = (function () {
	function KarmaRegex() {
		_classCallCheck(this, KarmaRegex);
	}

	_createClass(KarmaRegex, [{
		key: "helpPattern",
		get: function () {
			return /(\?)/;
		}
	}, {
		key: "initPattern",
		get: function () {
			return /((init \{)([\s\S]*)(\}))/;
		}
	}, {
		key: "userIdPattern",
		get: function () {
			return /<@(.*?)>/;
		}
	}, {
		key: "userIdSinglePattern",
		get: function () {
			return /^<@(.*?)>$/;
		}
	}, {
		key: "teamIdPattern",
		get: function () {
			return /<!everyone>/;
		}
	}, {
		key: "posPattern",
		get: function () {
			return /((<@)(.*)(> ?)(\+\+))/;
		}
	}, {
		key: "negPattern",
		get: function () {
			return /((<@)(.*)(> ?)(\-\-))/;
		}
	}]);

	return KarmaRegex;
})();

exports["default"] = new KarmaRegex();
module.exports = exports["default"];
//# sourceMappingURL=../core/karmaregex.js.map