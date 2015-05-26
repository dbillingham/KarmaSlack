'use strict';

var _sourceMapSupport = require('source-map-support');

(0, _sourceMapSupport.install)();

console.log([1, 2, 3].map(function (x) {
  return x * x;
}));

throw new Error('Testa!');
//# sourceMappingURL=myapp.js.map