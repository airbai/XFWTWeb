var app = getApp()
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
    // 请求数据
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
  sourceType: ['album', 'camera'],
  success: function (res) {
    
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    that.setData({
     iconLink:res.tempFilePaths[0]
    })

// 上传头像
wx.uploadFile({
      url: 'http://112.74.128.53:9997/upLoadFiles.asmx/upLoadOneChunkForIOS', 
      filePath: res.tempFilePaths[0],
      name: 'userIcon',
      formData:{
        // 'user': 'test'
      },
      　header:{
　　　　　　'content-type':'multipart/form-data'
　　　　},
      success: function(res){
        var data = res.data
       
      },fail: function(res){
        var data = res.data
        //do something
      }
    })


  }
})
  },

// func:男生、女生选择事件
  radioChange: function(e) {
},


// func:取消事件
  cancle:function(){
wx.navigateBack({
  delta: 1
})
  },
  // func:保存事件
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

//请求数据
var that = this
wx.request({
  url: app.serverUrl,
  data: {
     action: 'GetUserDetailss' ,
     type: '0' ,
     TeacherID: app.util.getLoginInfo().uid ,
     VerSafe: app.VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

wx.hideNavigationBarLoading()

// 请求失败
if(res.data.signIOS == 0){
 app.tip.showError(res.data.value) 
  return
}

//判断性别是否相等
if (res.data.value[0].Sex){
 that.setData({ boyChecked:true})
  } else{
  that.setData({ girlChecked:false}) 
  }

  that.setData({
  jsonData: res.data.value[0],
  iconLink:app.imageUrl + res.data.value[0].PhoneLink
})  
  },

    fail: function(res) {
  }
})
  }

})