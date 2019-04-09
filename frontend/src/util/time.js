export function getTimeAgo (duration) {
  var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (var i = 0; i < arrr.length; i++) {
    var inm = Math.floor(duration / 1000000 / arrn[i])
    if (inm !== 0) {
      return inm + arrr[i] + '前'
    }
  }
}

export function format (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}
