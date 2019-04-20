'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLogListByContainer = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fetchLogListByContainer = exports.fetchLogListByContainer = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var must = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var structPlain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var data, resp, hits;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {
              query: {
                bool: {
                  must: [{
                    term: { _type: 'fluentd-docker' }
                  }]
                }
              }
            };


            data.query.bool.must = data.query.bool.must.concat(must);

            _context.next = 4;
            return (0, _base2.default)({
              method: 'POST',
              url: '/elastic/_search',
              data: data
            });

          case 4:
            resp = _context.sent;

            if (!(resp.data.code !== 200)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return');

          case 7:
            hits = resp.data.data.hits.hits;

            if (structPlain) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', hits);

          case 10:
            return _context.abrupt('return', hits.map(function (item) {
              return (0, _util.objectFlattened)(item);
            }));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchLogListByContainer() {
    return _ref.apply(this, arguments);
  };
}();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _util = require('@/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=elastic.js.map