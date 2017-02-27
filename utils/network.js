
//1. 获取md5加密后的字符串
function getUpperMd5Str(){

//获取当前时间
var time = new Date() 
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  var day = time.getDate()
  var array = [year, month, day].map(formatNumber)
  var nowDate = array[0]+''+array[1]+''+array[2]

// 获取当前日期
// var templateFunc = require('../../../utils/util.js') 
// var nowDate = templateFunc.formatYearMonthDate(time)
  
//调用模板进行md5加密
var str = nowDate + 'QceduXueF@%&*(!~)^$?.' 
var templateFunc = require('md5.js');   
var password = templateFunc.hexMD5(str);  
return password.toUpperCase() //大写
}

//2. 月、日补0的方法
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//3. 暴露模板
module.exports.getUpperMd5Str = getUpperMd5Str

