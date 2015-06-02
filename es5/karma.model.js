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

var karmaSchema = _mongoose2['default'].Schema({
	teamId: String,
	userId: String,
	fromUserId: String,
	created: { type: Date, 'default': Date.now }
});

var KarmaModel = (function () {
	function KarmaModel() {
		_classCallCheck(this, KarmaModel);
	}

	_createClass(KarmaModel, null, [{
		key: 'getUserPoints',
		value: function getUserPoints(teamId, userId) {
			return this.find({ teamId: teamId, userId: userId });
		}
	}, {
		key: 'getTeamPoints',
		value: function getTeamPoints(teamId) {
			var _this = this;

			return new Promise(function (res, rej) {

				_this.aggregate([{
					$match: { teamId: teamId }
				}, {
					$group: {
						_id: '$userId',
						count: { $sum: 1 }
					}
				}, {
					'$sort': {
						'count': -1
					}
				}], function (err, collection) {
					res(collection);
				});
			});
		}
	}, {
		key: 'deleteLatestPoint',
		value: function deleteLatestPoint(teamId, userId, fromUserId) {
			return this.findOneAndRemove({ teamId: teamId, userId: userId, fromUserId: fromUserId }, { sort: { created: 'asc' } });
		}
	}]);

	return KarmaModel;
})();

/*
schema.statics.nameContains = function(name, cb){
	return this.find({name: new RegExp(name, 'i')}, cb);	
};
*/

karmaSchema.plugin(_mongooseClassWrapper2['default'], KarmaModel);

exports['default'] = _mongoose2['default'].model('Karma', karmaSchema);
module.exports = exports['default'];
//# sourceMappingURL=karma.model.js.map