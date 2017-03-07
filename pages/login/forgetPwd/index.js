Page({
  data:{
    phoneNum: '',
     code: '',
     pwd: '',
     loadingHide: true,
     receiveCode: '',
     second: '获取验证码',
      unit: '',
      bgc:'red',
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
 
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  onShow:function(){
    // 生命周期函数--监听页面显示

  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
   
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
   phoneInputValueChanged :function(e){
    // func: 手机输入框输入了就会调用
    this.data.phoneNum = e.detail.value 
  },
    codeInputValueChanged :function(e){
    //  func:  手机输入框输入了就会调用
    this.data.code = e.detail.value
  },
  pwdInputValueChanged :function(e){
    // func:   密码输入框输入了就会调用
     this.data.pwd = e.detail.value
  },
    codeAction: function() {
   // func:获取验证码事件
   var that = this
   
  if (that.data.phoneNum.length != 11){
   getApp().tip.showError("请输入有效手机") 
     return
}

    wx.request({ // 获取验证码api
  url: getApp().serverUrl,
  data: {
    action: 'sendvers',
     Mobile: that.data.phoneNum ,
     SMS_Type: '3',
     VerSafe: getApp().VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

    // 请求失败
if(res.data.signIOS == 0){
 getApp().tip.showError(res.data.msg) 
  return
}

// 不能重复点击
if (that.data.second != "获取验证码"){
  return
}

 // 设置起始时间：
   that.setData({
        second:'60',
        unit:'秒',
        bgc:'gray'
      })

 // 倒计时开始：
 that.countdown(that); 

getApp().tip.showError("已发送，请查收") 

// 保存获取到的验证码
that.setData({
  receiveCode: res.data.value
})
},
   fail: function(res) {
     getApp().tip.showError("网络出错")  
  }
})
 },

 //     func:确认事件
 sureAction: function(){
 
      var that = this
   
    if (!that.data.phoneNum ||  !that.data.code || !that.data.pwd || that.data.phoneNum.length != 11 || isNaN(that.data.phoneNum) ){
 getApp().tip.showError("请检查账号或密码")  
return
 }

 if(that.data.code != that.data.receiveCode){
   getApp().tip.showError("验证码有误") 
return
 }

// 出现提示框
  that.setData({
   loadingHide:false
})

 // 找回密码api
  this.reqData()
 },

// func:请求数据
  reqData:function(){
    
var that = this
// pwd md5加密
let md5pwd = getApp().md5.hexMD5(this.data.pwd)

//3. 请求数据
wx.request({
  url: getApp().serverUrl,
  data: {
     action: 'AlterPasswords' ,
     PassWord: md5pwd,
     Mobile: that.data.phoneNum,
     VerSafe: getApp().VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

// 隐藏提示框
  that.setData({
   loadingHide:true
})
// 请求失败
if(res.data.signIOS == 0){
 getApp().tip.showError(res.data.value) 
  return
}

getApp().tip.showSuccess("修改成功") 

  // 跳转到首
wx.navigateBack({
   delta: 1
})
 
  },
 fail: function(res) {

  }
})

},
// 倒计时：
countdown: function (that) {  

 if (that.data.second == 0) {  
  that.setData({  
   second: "获取验证码",
    unit:'',
    bgc:'red'
  })
  return   
 }  
 var time = setTimeout(function(){  
  that.setData({  
   second: that.data.second - 1,
  })  
  that.countdown(that) 
 }  
 ,1000)  
}  
})