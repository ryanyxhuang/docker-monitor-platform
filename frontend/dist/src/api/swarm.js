'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinSwarm = exports.deleteSwarm = exports.createSwarm = exports.fetchSwarmInfo = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fetchSwarmInfo = exports.fetchSwarmInfo = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _base2.default.get('/endpoint/local/docker/swarm');

          case 2:
            resp = _context.sent;

            if (!(resp.data.code === 200)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', resp.data.data);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchSwarmInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createSwarm = exports.createSwarm = function () {
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
              url: '/compose',
              data: payload
            });

          case 2:
            resp = _context2.sent;

            if (!(resp.data.code !== 200)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', resp.data.message);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function createSwarm() {
    return _ref2.apply(this, arguments);
  };
}();

var deleteSwarm = exports.deleteSwarm = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resp;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _base2.default)({
              method: 'POST',
              url: '/compose',
              data: payload
            });

          case 2:
            resp = _context3.sent;

            if (!(resp.data.code !== 200)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', resp.data.message);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function deleteSwarm() {
    return _ref3.apply(this, arguments);
  };
}();

var joinSwarm = exports.joinSwarm = function () {
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
              url: '/compose',
              data: payload
            });

          case 2:
            resp = _context4.sent;

            if (!(resp.data.code !== 200)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', resp.data.message);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function joinSwarm() {
    return _ref4.apply(this, arguments);
  };
}();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=swarm.js.map