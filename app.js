

//app.js
App({
  
// 0.全局数据
userInfo:null,
longitude:null,
latitude:null,
serverUrl:'http://112.74.128.53:9528/APP_Action.ashx?',
imageUrl: 'http://112.74.128.53:9997/',
windowWidth:null,
windowHeight:null,
VerSafe: null,

// 1.模板（工具）
tip:require('utils/tip.js'),
network:require('utils/network.js'),
md5:require('utils/md5.js'),
util:require('utils/util.js'),


// 程序启动完毕
  onLaunch:function() {

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    this.getUserInfo()

    // 获取用户地理位置
    var that = this
    wx.getLocation({
  type: 'wgs84',
  success: function(res) {
    that.longitude = res.longitude
      that.latitude = res.latitude
  }
})

// 获取用户系统信息：手机宽高
wx.getSystemInfo({
  success: function(res) {
     that.windowWidth = res.windowWidth
      that.windowHeight = res.windowHeight
  }
})

// md5加密后的安全码
 that.VerSafe = this.network.getUpperMd5Str()
  },

// 2.当小程序启动，或从后台进入前台显示会触发
    onShow: function() {
      // Do something when show.
  },

  // 3.当小程序从前台进入后台，会触发 
  onHide: function() {
      // Do something when hide.
  },

// 4.获取用户信息
  getUserInfo:function(cb){

    var that = this

    if(this.userInfo){

      typeof cb == "function" && cb(this.userInfo)

    }else{
      //调用登录接口
      wx.login({
        success: function () {

          wx.getUserInfo({
            success: function (res) {

        that.userInfo = res.userInfo
              typeof cb == "function" && cb(that.userInfo)
            }
          })
        }
      })
    }
  },

})