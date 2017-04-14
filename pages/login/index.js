let app = getApp()

Page({
  data:{
 icon:'../../../image/my_teacher@2x.png',
  phoneNum : '',
  pwd : '',
  loadingHide : true
  },
   
  onLoad:function(options){
    // 生命周期函数--监听页面加载

    // 是否有缓存
  if(typeof(app.util.getLoginInfo()) == "undefined"){
   return
  }
    // 获取缓存里的phone、pwd
      let that = this
       that.setData({
       phoneNum : app.util.getLoginInfo().phone ,
       pwd : app.util.getLoginInfo().pwd 
 })

// 自动登录
that.loginAction()



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
  // onShareAppMessage: function() {
  //   // 用户点击右上角分享
  //   return {
  //     title: 'title', // 分享标题
  //     desc: 'desc', // 分享描述
  //     path: 'path' // 分享路径
  //   }

  // },
  phoneInputValueChanged :function(e){
    //   手机输入框输入了就会调用
    this.data.phoneNum = e.detail.value
  },
  pwdInputValueChanged :function(e){
    //   密码输入框输入了就会调用
     this.data.pwd = e.detail.value

  },
  loginAction:function(){
    //     登录
    if (!this.data.phoneNum || !this.data.pwd || this.data.phoneNum.length != 11 || isNaN(this.data.phoneNum) ){

    app.tip.showError("请检查账号或密码") 
     return
 }


// 出现提示框
  this.setData({
   loadingHide:false
})

 // 登录api
  this.reqData()
  },
  
reqData:function(){
    // 请求数据：
    var that = this

// pwd md5加密  
let md5pwd = app.md5.hexMD5(this.data.pwd); 

//3. 请求数据
wx.request({
  url: app.serverUrl,
  data: {
     action: 'logins' ,
     LoginName:that.data.phoneNum ,
     PassWords:md5pwd,
     VerSafe: app.VerSafe
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
 app.tip.showError(res.data.value) 
  return
}

// 获取用户数据
let arr = res.data.value.split(","); //字符分割 
var userInfoJson = {
    uid : arr[0],
    phone : arr[1],
    userType : arr[2],
    iconLink : arr[3],
    nick : arr[4],
    pwd : that.data.pwd
}

// 缓存用户数据
wx.setStorage({
  key: 'userLoginInfo',
  data: userInfoJson
})

// 界面跳转
wx.switchTab({
  url: '../index/index'
})
 
  },
 fail: function(res) {
  }
})

},
registAction:function(){
  // 注册事件：
  wx.navigateTo({
    url: 'regist/index'
  })
},
forgetPwdAction:function (){
  // 忘记密码
  wx.navigateTo({
    url: 'forgetPwd/index'
  })
},


})