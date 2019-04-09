export function deepCopy (obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

export function getDeepValue (obj, key) {
  var result = []
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (key === k) {
        result.push(obj[k])
      }
      if (typeof obj[k] === 'object') {
        result.push(...getDeepValue(obj[k], key))
      }
    }
  }
  return result
}

export function b64EncodeUnicode (str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function (match, p1) {
      return String.fromCharCode('0x' + p1)
    }))
}

export function byteTransferConver (limit, decimal) {
  limit = Number(limit)
  let size = ''
  if (limit < 0.1 * 1024) { // 如果小于0.1KB/s转化成B
    size = limit.toFixed(decimal) + 'B/s'
  } else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB/s转化成KB
    size = (limit / 1024).toFixed(decimal) + 'KB/s'
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB/s转化成MB
    size = (limit / (1024 * 1024)).toFixed(decimal) + 'MB/s'
  } else { // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(decimal) + 'GB/s'
  }
  return size
}

export function byteConver (limit, decimal) {
  limit = Number(limit)
  let size = ''
  if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B
    size = limit.toFixed(decimal) + 'B/s'
  } else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(decimal) + 'KB/s'
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(decimal) + 'MB/s'
  } else { // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(decimal) + 'GB/s'
  }
  return size
}
