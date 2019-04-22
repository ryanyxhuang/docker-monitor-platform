'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDockerCompose = exports.updateDockerCompose = exports.fetchDockerCompose = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fetchDockerCompose = exports.fetchDockerCompose = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
    var resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _base2.default.get('/compose/' + id);

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

  return function fetchDockerCompose(_x) {
    return _ref.apply(this, arguments);
  };
}();

var updateDockerCompose = exports.updateDockerCompose = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resp;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _base2.default)({
              method: 'PUT',
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

  return function updateDockerCompose() {
    return _ref2.apply(this, arguments);
  };
}();

var createDockerCompose = exports.createDockerCompose = function () {
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

  return function createDockerCompose() {
    return _ref3.apply(this, arguments);
  };
}();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=compose.js.map