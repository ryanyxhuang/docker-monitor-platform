'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSettings = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fetchSettings = exports.fetchSettings = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _base2.default.get('/setting');

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

  return function fetchSettings() {
    return _ref.apply(this, arguments);
  };
}();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=setting.js.map