'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sourceMapSupport = require('source-map-support');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

//import { bodyParser } from 'body-parser';
//import { mongoose } from 'mongoose';
//import { Slack } from 'slack-node';

var _es5ConfigJs = require('../es5/config.js');

var _es5ConfigJs2 = _interopRequireDefault(_es5ConfigJs);

(0, _sourceMapSupport.install)();

var app = (0, _express2['default'])();

var config = new _es5ConfigJs2['default']();

console.log([1, 2, 3].map(function (x) {
  return x * x;
}));

app.listen('3000', function () {
  return console.log('Running on port ' + config.port);
});
//# sourceMappingURL=myapp2.js.map