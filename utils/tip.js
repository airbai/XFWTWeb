
// 1.成功提示
function showSuccess (text){
return wx.showToast({
  title: text,
  icon: 'success',
  duration: 2000
})
}

// 2.失败提示
function showError (text){
return wx.showToast({
  title: text,
  icon: 'loading',
  duration: 2000
})
}


// 3.暴露模板
module.exports.showSuccess = showSuccess
exports.showError = showError
