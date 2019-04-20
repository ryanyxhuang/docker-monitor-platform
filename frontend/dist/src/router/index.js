'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _home = require('@/view/home');

var _home2 = _interopRequireDefault(_home);

var _ContainersList = require('@/view/ContainersList');

var _ContainersList2 = _interopRequireDefault(_ContainersList);

var _ServicesList = require('@/view/ServicesList');

var _ServicesList2 = _interopRequireDefault(_ServicesList);

var _StacksList = require('@/view/StacksList');

var _StacksList2 = _interopRequireDefault(_StacksList);

var _NodesList = require('@/view/NodesList');

var _NodesList2 = _interopRequireDefault(_NodesList);

var _ContainerLog = require('@/view/ContainerLog');

var _ContainerLog2 = _interopRequireDefault(_ContainerLog);

var _StackAnalysis = require('@/view/StackAnalysis');

var _StackAnalysis2 = _interopRequireDefault(_StackAnalysis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: _home2.default
  }, {
    path: '/containers',
    name: 'containersList',
    component: _ContainersList2.default
  }, {
    path: '/services',
    name: 'servicesList',
    component: _ServicesList2.default
  }, {
    path: '/stacks',
    name: 'stacksList',
    component: _StacksList2.default
  }, {
    path: '/swarm',
    name: 'nodesList',
    component: _NodesList2.default
  }, {
    path: '/containers/:id/log',
    name: 'containerLog',
    component: _ContainerLog2.default
  }, {
    path: '/stack/:id/analysis',
    name: 'stackAnalysis',
    component: _StackAnalysis2.default
  }]
});
//# sourceMappingURL=index.js.map