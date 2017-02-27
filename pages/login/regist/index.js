Page({
  data:{
     phoneNum: '',
     code: '',
     pwd: '',
     againPwd: '',
     loadingHide: true,
     receiveCode: ''
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
    //   手机输入框输入了就会调用
    this.data.phoneNum = e.detail.value
  },
    codeInputValueChanged :function(e){
    //   手机输入框输入了就会调用
    this.data.code = e.detail.value
  },
  pwdInputValueChanged :function(e){
    //   密码输入框输入了就会调用
     this.data.pwd = e.detail.value
  },
    againPwdInputValueChanged :function(e){
    //   确认密码输入框输入了就会调用
     this.data.againPwd = e.detail.value
  },
  codeAction: function() {

var that = this
    // 获取验证码事件：
if (that.data.phoneNum.length != 11){
   getApp().tip.showError("请输入有效手机号") 
return
}

    wx.request({ // 获取验证码api
  url: getApp().globalData.serverUrl,
  data: {
    action: 'sendvers',
     Mobile: that.data.phoneNum ,
     SMS_Type: '1',
     VerSafe: getApp().globalData.VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

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
    registAction: function(){

      var that = this
    //     注册事件：
    if (!that.data.phoneNum ||  !that.data.code || !that.data.pwd || !that.data.againPwd || that.data.phoneNum.length != 11 || isNaN(that.data.phoneNum) ){
 getApp().tip.showError("请检查账号或密码")  
return
 }

 if(that.data.code != that.data.receiveCode){
   getApp().tip.showError("验证码有误") 
return
 }

if(that.data.pwd  != that.data.againPwd ){
  // 2次密码不对
wx.showToast({
  title: '两次输入密码对不上',
  icon: 'loading',
  duration: 2000
})
return
}

// 出现提示框
  that.setData({
   loadingHide:false
})

 // 注册api
  this.reqData()

 },
 
 reqData:function(){
    // 请求数据：
var that = this
// pwd md5加密
let md5pwd = getApp().md5.hexMD5(this.data.pwd)

//3. 请求数据
wx.request({
  url: getApp().globalData.serverUrl,
  data: {
     action: 'userregs' ,
     LoginName: that.data.phoneNum ,
     PassWord: md5pwd,
     Mobile: that.data.phoneNum,
     UserType: '1',
     VerSafe: getApp().globalData.VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

// 隐藏提示框
  that.setData({
   loadingHide:true
})

// 跳转到首页
wx.switchTab({
  url: '../../index/index'
})
 
  },
 fail: function(res) {

 getApp().tip.showError("注册失败 ￣へ￣") 
  }
})

},
})