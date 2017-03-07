Page({
  data:{
    phoneNum: '',
    beforePwd:'',
     pwd: '',
     loadingHide: true
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
var that = this
that.setData({
    phoneNum: getApp().util.getLoginInfo().phone
})
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
//   onShareAppMessage: function() {
//     // 用户点击右上角分享
//     return {
//       title: 'title', // 分享标题
//       desc: 'desc', // 分享描述
//       path: 'path' // 分享路径
//     }
//   },
   phoneInputValueChanged :function(e){
    // func: 手机输入框输入了就会调用
    this.data.phoneNum = e.detail.value 
  },
    beforePwdInputValueChanged :function(e){
    //  func:  原密码输入框输入了就会调用
    this.data.beforePwd = e.detail.value
  },
  pwdInputValueChanged :function(e){
    // func:   新密码输入框输入了就会调用
     this.data.pwd = e.detail.value
  },

 //     func:确认事件
 sureAction: function(){
 
      var that = this
   
    if (!that.data.pwd){

 getApp().tip.showError("请检查账号或密码")  
return
 }

 // 找回密码api
  that.reqData()
 },

// func:请求数据
  reqData:function(){

var that = this
// 出现提示框
  that.setData({
   loadingHide:false
})
    

// pwd md5加密
let beforePwdMd5 = getApp().md5.hexMD5(that.data.beforePwd)
let md5pwd = getApp().md5.hexMD5(that.data.pwd)

//3. 请求数据
wx.request({
  url: getApp().serverUrl,
  data: {
     action: 'Alter_PassWordByUserIDs' ,
     UserID: getApp().util.getLoginInfo().uid,
     OldPwd: beforePwdMd5,
     NewPwd: md5pwd,
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

getApp().tip.showSuccess("修改成功,尝试登录") 

// 同步清理缓存
  try { wx.clearStorageSync()} catch(e) { }

  // 返回
wx.redirectTo({
  url: '../../../login/index'
})
 
  },
 fail: function(res) {

  }
})

},
 
})