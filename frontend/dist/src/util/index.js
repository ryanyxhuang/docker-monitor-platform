'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.deepCopy = deepCopy;
exports.objectFlattened = objectFlattened;
exports.getDeepValue = getDeepValue;
exports.b64EncodeUnicode = b64EncodeUnicode;
exports.byteTransferConver = byteTransferConver;
exports.byteConver = byteConver;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if ((0, _typeof3.default)(obj[key]) === 'object') {
        result[key] = deepCopy(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

function objectFlattened(obj) {
  function _objectFlattened(obj, prefix) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      var resultKey = prefix ? prefix + '.' + key : key;
      if (obj.hasOwnProperty(key)) {
        if ((0, _typeof3.default)(obj[key]) === 'object') {
          (0, _assign2.default)(result, result, _objectFlattened(obj[key], resultKey));
        } else {
          result[resultKey] = obj[key];
        }
      }
    }
    return result;
  }
  return _objectFlattened(obj, '');
}

function getDeepValue(obj, key) {
  var result = [];
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (key === k) {
        result.push(obj[k]);
      }
      if ((0, _typeof3.default)(obj[k]) === 'object') {
        result.push.apply(result, (0, _toConsumableArray3.default)(getDeepValue(obj[k], key)));
      }
    }
  }
  return result;
}

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

function byteTransferConver(limit, decimal) {
  limit = Number(limit);
  var size = '';
  if (limit < 0.1 * 1024) {
    // 如果小于0.1KB/s转化成B
    size = limit.toFixed(decimal) + 'B/s';
  } else if (limit < 0.1 * 1024 * 1024) {
    // 如果小于0.1MB/s转化成KB
    size = (limit / 1024).toFixed(decimal) + 'KB/s';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    // 如果小于0.1GB/s转化成MB
    size = (limit / (1024 * 1024)).toFixed(decimal) + 'MB/s';
  } else {
    // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(decimal) + 'GB/s';
  }
  return size;
}

function byteConver(limit, decimal) {
  limit = Number(limit);
  var size = '';
  if (limit < 0.1 * 1024) {
    // 如果小于0.1KB转化成B
    size = limit.toFixed(decimal) + 'B/s';
  } else if (limit < 0.1 * 1024 * 1024) {
    // 如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(decimal) + 'KB/s';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    // 如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(decimal) + 'MB/s';
  } else {
    // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(decimal) + 'GB/s';
  }
  return size;
}
//# sourceMappingURL=index.js.map