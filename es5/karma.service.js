"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _es5KarmaModelJs = require("../es5/karma.model.js");

var _es5KarmaModelJs2 = _interopRequireDefault(_es5KarmaModelJs);

var KarmaService = (function () {
	function KarmaService() {
		_classCallCheck(this, KarmaService);
	}

	_createClass(KarmaService, [{
		key: "add",

		//Add Karma record

		value: function add(teamId, userId, fromUserId) {
			var _this = this;

			return new Promise(function (res, rej) {

				_es5KarmaModelJs2["default"].create({
					"teamId": teamId,
					"userId": userId,
					"fromUserId": fromUserId
				}).then(function () {
					return _this.userCount(teamId, userId, "increased").then(function (data) {
						return res(data);
					});
				});
			});
		}
	}, {
		key: "remove",

		//Remove Karma record

		value: function remove(teamId, userId, fromUserId) {
			var _this2 = this;

			return new Promise(function (res, rej) {

				if (userId === fromUserId) {
					return fromSelf().then(function (data) {
						return res(data);
					});
				}

				return _es5KarmaModelJs2["default"].deleteLatestPoint(teamId, userId, fromUserId).then(function (entity) {
					if (!entity) {
						return whenNoRecordFound(userId).then(function (data) {
							return res(data);
						});
					}
					return _this2.userCount(teamId, userId, "decreased").then(function (data) {
						return res(data);
					});
				});
			});

			function whenNoRecordFound(userId) {

				return Promise.resolve("" + userId + " needs some positive karma from you first.");
			};

			function fromSelf() {

				return Promise.resolve("Don't be so hard on yourself.");
			};
		}
	}, {
		key: "userCount",

		//Get Karma count for user

		value: function userCount(teamId, userId, incDec) {

			return new Promise(function (res, rej) {
				_es5KarmaModelJs2["default"].getUserPoints(teamId, userId).then(function (collection) {
					var responseText = "<@" + userId + "> has a karma of " + collection.length + ".";

					if (incDec) {
						responseText = "<@" + userId + ">s karma has " + incDec + " to " + collection.length + ".";
					}

					res(responseText);
				});
			});
		}
	}, {
		key: "teamCount",

		//Get Karma count for team

		value: function teamCount(teamId) {

			return new Promise(function (res, rej) {
				_es5KarmaModelJs2["default"].getTeamPoints(teamId).then(function (collection) {

					var responseText = "Karma Totals: \n";

					for (var user = 0, len = collection.length; user < len; user++) {
						var element = collection[user];
						responseText += " <!" + element._id + "> has a karma of " + element.count + ". \n";
					}
					res(responseText);
				});
			});
		}
	}]);

	return KarmaService;
})();

exports["default"] = KarmaService;
module.exports = exports["default"];
//# sourceMappingURL=karma.service.js.map