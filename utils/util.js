
// 1.获取当前时间,格式：2017/02/15 18:10:05
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}




//2. 获取当前时间,格式：20170215
function formatYearMonthDate(time) {
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  var day = time.getDate()
  var result = [year, month, day].map(formatNumber)
  return result[0]+''+result[1]+''+result[2]
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//暴露模板1
module.exports = {
  formatTime: formatTime
}

//暴露模板2
module.exports = {
  formatYearMonthDate: formatYearMonthDate
}
