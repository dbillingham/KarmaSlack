'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sourceMapSupport = require('source-map-support');

var _configConfigJs = require('./config/config.js');

var _configConfigJs2 = _interopRequireDefault(_configConfigJs);

var _configConfigModelJs = require('./config/config.model.js');

var _configConfigModelJs2 = _interopRequireDefault(_configConfigModelJs);

var _coreMongooseServiceJs = require('./core/mongoose.service.js');

var _coreMongooseServiceJs2 = _interopRequireDefault(_coreMongooseServiceJs);

var _karmaKarmaServiceJs = require('./karma/karma.service.js');

var _karmaKarmaServiceJs2 = _interopRequireDefault(_karmaKarmaServiceJs);

var _configConfigServiceJs = require('./config/config.service.js');

var _configConfigServiceJs2 = _interopRequireDefault(_configConfigServiceJs);

var _coreSlackServiceJs = require('./core/slack.service.js');

var _coreSlackServiceJs2 = _interopRequireDefault(_coreSlackServiceJs);

var _coreExpressServiceJs = require('./core/express.service.js');

var _coreExpressServiceJs2 = _interopRequireDefault(_coreExpressServiceJs);

var _karmaKarmaRouteJs = require('./karma/karma.route.js');

var _karmaKarmaRouteJs2 = _interopRequireDefault(_karmaKarmaRouteJs);

(0, _sourceMapSupport.install)();

var config = new _configConfigJs2['default']();

var mongooseService = new _coreMongooseServiceJs2['default'](config);
mongooseService.init();

var expressService = new _coreExpressServiceJs2['default'](config);
var configService = new _configConfigServiceJs2['default']();
var slackService = new _coreSlackServiceJs2['default'](configService);
var karmaService = new _karmaKarmaServiceJs2['default']();
var karmaRoute = new _karmaKarmaRouteJs2['default'](expressService, configService, slackService, karmaService);

expressService.run();
//# sourceMappingURL=app.js.map