'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContainersWithHighMemoryUsage = exports.getContainersWithHighCPUUsage = exports.getContainersWithHignDiskIO = exports.getContainersWithHignNetIO = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getContainersWithHignNetIO = exports.getContainersWithHignNetIO = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _base2.default)({
              method: 'POST',
              url: '/endpoint/local/prom/api/v1/query',
              data: { 'query': 'sum(rate(container_network_receive_bytes_total{id=~"/docker/.*"}[' + payload.promInterval + ']) + rate(container_network_transmit_bytes_total{id=~"/docker/.*"}[' + payload.promInterval + '])) by (name) >' + payload.netIOThreshold
              },
              headers: {
                'Authorization': 'Basic ' + (0, _util.b64EncodeUnicode)(payload.promAccount)
              }
            });

          case 2:
            resp = _context.sent;

            if (!(resp.data.code === 200)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', resp.data.data.result.map(function (item) {
              if (item.value[1]) {
                item.value[1] = (0, _util.byteTransferConver)(item.value[1], 2);
              }
              return item;
            }));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getContainersWithHignNetIO() {
    return _ref.apply(this, arguments);
  };
}();
// import {NetIOThreshold, DiskIOThreshold, CPUUsageThreshold, MemoryUsageThreshold, PromAccount, Interval} from '@/common/constants'


var getContainersWithHignDiskIO = exports.getContainersWithHignDiskIO = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resp;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _base2.default)({
              method: 'POST',
              url: '/endpoint/local/prom/api/v1/query',
              data: { 'query': 'sum(rate(container_fs_io_current{id=~"/docker/.*"}[' + payload.promInterval + '])) by (name) > ' + payload.diskIOThreshold
              },
              headers: {
                'Authorization': 'Basic ' + (0, _util.b64EncodeUnicode)(payload.promAccount)
              }
            });

          case 2:
            resp = _context2.sent;

            if (!(resp.data.code === 200)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', resp.data.data.result.map(function (item) {
              if (item.value[1]) {
                item.value[1] = (0, _util.byteTransferConver)(item.value[1], 2);
              }
              return item;
            }));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getContainersWithHignDiskIO() {
    return _ref2.apply(this, arguments);
  };
}();

var getContainersWithHighCPUUsage = exports.getContainersWithHighCPUUsage = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resp;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(payload.promInterval, payload.cpuUsageThreshold, 'sum(irate(container_cpu_usage_seconds_total{id=~"/docker/.*"}[' + payload.promInterval + '])) by (name) * 100 > ' + payload.cpuUsageThreshold);
            _context3.next = 3;
            return (0, _base2.default)({
              method: 'POST',
              url: '/endpoint/local/prom/api/v1/query',
              data: { 'query': 'sum(irate(container_cpu_usage_seconds_total{id=~"/docker/.*"}[' + payload.promInterval + '])) by (name) * 100 > ' + payload.cpuUsageThreshold
              },
              headers: {
                'Authorization': 'Basic ' + (0, _util.b64EncodeUnicode)(payload.promAccount)
              }
            });

          case 3:
            resp = _context3.sent;

            if (!(resp.data.code === 200)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt('return', resp.data.data.result.map(function (item) {
              item.value[1] = Number(item.value[1]).toFixed(2) + '%';
              return item;
            }));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getContainersWithHighCPUUsage() {
    return _ref3.apply(this, arguments);
  };
}();

var getContainersWithHighMemoryUsage = exports.getContainersWithHighMemoryUsage = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resp;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _base2.default)({
              method: 'POST',
              url: '/endpoint/local/prom/api/v1/query',
              data: { 'query': 'avg_over_time(container_memory_usage_bytes{id=~"/docker/.*"}[' + payload.promInterval + ']) > ' + payload.memoryUsageThreshold
              },
              headers: {
                'Authorization': 'Basic ' + (0, _util.b64EncodeUnicode)(payload.promAccount)
              }
            });

          case 2:
            resp = _context4.sent;

            if (!(resp.data.code === 200)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', resp.data.data.result.filter(function (item) {
              return item.metric && item.metric.name;
            }).map(function (item) {
              item.value[1] = '' + (0, _util.byteConver)(item.value[1], 2);
              return item;
            }));

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getContainersWithHighMemoryUsage() {
    return _ref4.apply(this, arguments);
  };
}();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _util = require('@/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=metrics.js.map