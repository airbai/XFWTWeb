

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
navbarHeight:64,
VerSafe: null,

// 1.模板（工具）
tip:require('utils/tip.js'),
network:require('utils/network.js'),
md5:require('utils/md5.js'),
util:require('utils/util.js'),


// 程序启动完毕
  onLaunch:function(res) {

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

// wx.checkSession({
//   success: function(res){ //session 未过期，并且在本生命周期一直有效
//     console.log(res)
//   },
//   fail: function(res){ //登录态过期
     
//   }
// })

 this.cacheUserInfo() //重新登录
   

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

  // 程序出错
  onError:function(res) {
console.log("程序发生错误："+ res)
  },

// 4.获取用户信息
  cacheUserInfo:function(){

    var that = this

      //调用登录接口
      wx.login({

        success: function (res) {
      //  1.获取用户信息
          wx.getUserInfo({
            success: function (res) {
             that.userInfo = res.userInfo
            }
          })

       // 2.登录态失败
      if (! res.code) {
       console.log('获取用户登录态失败！' + res.errMsg)
       return;
      }

//3.发送code给自己的服务器
wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            },

/** 
 4.自己服务器通过下面👇接口去微信服务器获取session_key和openid:
(小写为固定写好的,大写为待替换的。appid 、secret 、grant_type都可以在自己服务器上写好)
https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code

微信登录实现步骤可参考简书链接：http://www.jianshu.com/p/d9996cafdb31
*/
  success: function (res) {
//5.自己服务器再返回openid给客户端,然后缓存下来，微信支付可能会用到openid。
}
          })

        },  fail: function (res) { //用户不授权微信登录
          console.log('用户不授权微信登录' )
        }
      })
    
  },

})