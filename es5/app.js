'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sourceMapSupport = require('source-map-support');

var _es5ConfigJs = require('../es5/config.js');

var _es5ConfigJs2 = _interopRequireDefault(_es5ConfigJs);

var _es5ConfigModelJs = require('../es5/config.model.js');

var _es5ConfigModelJs2 = _interopRequireDefault(_es5ConfigModelJs);

var _es5MongooseServiceJs = require('../es5/mongoose.service.js');

var _es5MongooseServiceJs2 = _interopRequireDefault(_es5MongooseServiceJs);

var _es5KarmaServiceJs = require('../es5/karma.service.js');

var _es5KarmaServiceJs2 = _interopRequireDefault(_es5KarmaServiceJs);

var _es5ConfigServiceJs = require('../es5/config.service.js');

var _es5ConfigServiceJs2 = _interopRequireDefault(_es5ConfigServiceJs);

var _es5SlackServiceJs = require('../es5/slack.service.js');

var _es5SlackServiceJs2 = _interopRequireDefault(_es5SlackServiceJs);

var _es5ExpressServiceJs = require('../es5/express.service.js');

var _es5ExpressServiceJs2 = _interopRequireDefault(_es5ExpressServiceJs);

var _es5KarmaRouteJs = require('../es5/karma.route.js');

var _es5KarmaRouteJs2 = _interopRequireDefault(_es5KarmaRouteJs);

(0, _sourceMapSupport.install)();

var config = new _es5ConfigJs2['default']();

var mongooseService = new _es5MongooseServiceJs2['default'](config);
mongooseService.init();

var expressService = new _es5ExpressServiceJs2['default'](config);
var configService = new _es5ConfigServiceJs2['default']();
var slackService = new _es5SlackServiceJs2['default']();
var karmaService = new _es5KarmaServiceJs2['default']();
var karmaRoute = new _es5KarmaRouteJs2['default'](expressService, configService, slackService, karmaService);

expressService.run();
//# sourceMappingURL=app.js.map