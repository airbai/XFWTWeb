Page({
  data:{
   iconLink:'../../../image/0225icon.png',
   boyChecked:false,
   girlChecked:false,
   jsonData:{ },
   loadingLogo:true
  },

  onLoad:function(options){
    // 生命周期函数--监听页面加载
     this.reqData()
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成：


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

// 头像点击事件：
  tapIcon:function(){

var that = this 
wx.chooseImage({
  count: 1, // 默认9
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  success: function (res) {
    
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    that.setData({
     iconLink:res.tempFilePaths
    })
  }
})
  },

// 男生、女生选择事件：
  checkboxChange: function(e) {
    
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

  },


// 取消事件：
  cancle:function(){
wx.navigateBack({
  delta: 1
})
  },
  // 保存事件：
  keep:function(){

var that = this;
   that.setData({
    loadingLogo: false
   }),
wx.navigateBack({ //返回
  delta: 1
})
  },

// 请求数据：
   reqData:function(){

    wx.showNavigationBarLoading()

    // 调用网络模板获取md5加密后的字符串
 var networkTemplate = require('../../../utils/network.js'); 
var UpperMd5Str = networkTemplate.getUpperMd5Str()

//请求数据
var that = this

wx.request({
  url: getApp().globalData.serverUrl,
  data: {
     action: 'GetUserDetailss' ,
     type: '0' ,
     TeacherID: '2895' ,
     VerSafe: UpperMd5Str
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

wx.hideNavigationBarLoading()

//判断性别是否相等
if (res.data.value[0].Sex === false ){

  that.setData({ girlChecked:true})
  } else{
     that.setData({ boyChecked:true})
  }

  that.setData({
  jsonData: res.data.value[0],
  iconLink:"http://112.74.128.53:9997/" + res.data.value[0].PhoneLink
})  
  },

    fail: function(res) {
    console.log(res.data)
  }
})
  }

})