'use strict';

var _elementUi = require('element-ui');

var _elementUi2 = _interopRequireDefault(_elementUi);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

require('element-ui/lib/theme-chalk/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

_vue2.default.use(_elementUi2.default);
_vue2.default.prototype._ = _underscore2.default;

/* eslint-disable no-new */
new _vue2.default({
  el: '#app',
  router: _router2.default,
  components: { Layout: _layout2.default },
  template: '<layout/>'
});
//# sourceMappingURL=main.js.map