var socketOpen = false

Page({
  data:{
  hideSayView:"hidden",
  hideInput:"",
  selfDatas:[],
  facePic:'',
  inputValue:'',
  scrollViewH:0,
  viewID:'toView'
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
  //   this.setData({
  //     scrollViewH:getApp().windowHeight
  //   })

  //  var b = getApp().windowHeight

    // 标题
 wx.setNavigationBarTitle({
   title: options.teacherName
 })

 // socek连接
  this.connectSocket()

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
//   }


// func:连接socket
connectSocket:function(){

// 发起websocket连接
wx.connectSocket({
  url: "wss://112.74.128.53/10086",
  data: {},
  method: 'GET', 
  success: function(res){
    console.log('连接成功 ', res)
  },
  fail: function(res) {
   console.log('连接失败 ', res)
  },
  complete: function(res) {
     console.log('连接完成 ', res)
  }
})

// 连接成功回调
wx.onSocketOpen(function(res){
  socketOpen = true
  console.log('WebSocket连接已打开！')
})

// 连接失败回调
wx.onSocketError(function(res){
  socketOpen = false
  console.log('WebSocket连接打开失败，请检查！')
})

},

// func:声音事件
voiceAction:function(){

  // 切换发送语音和输入框
   let that = this
  let sayViewHide = that.data.hideSayView=="hidden" ? "" : "hidden"
 let inputHide = (sayViewHide=="hidden"? "" : "hidden")
 
  that.setData({
    hideSayView:sayViewHide,
    hideInput:inputHide
  })
},

// func:开始长按说话
bindtouchstart:function(){

let that = this 
wx.startRecord({
  success: function(res){
    var tempFilePath = res.tempFilePath[0]
  }
})

let json = {
  text:'',
  facePic:'',
  photo:'',
  voicePic:'../../../../../image/voice.png',
  flag:'语音'
}
 
 that.data.selfDatas.push(json)
that.setData({
  viewID:'toView',
  selfDatas:that.data.selfDatas
})
},

// func:松开手指，结束说话
bindtouchend:function(){

wx.stopRecord({
  success: function(res){
    // success
  }
})
},

// func:发送文字
sendTextAction:function(e){

let that = this 
//没输入文字
if(e.detail.value==''){
  return
}

  // 数组追加文字
let json = {
  text:e.detail.value,
  facePic:'',
  photo:'',
  voicePic:'',
  flag:'文本'
}

 that.data.selfDatas.push(json)
 
that.setData({ 
  viewID:'toView',
  inputValue:'',//文字置空
  selfDatas:that.data.selfDatas
})
},

// func:发送表情
faceAction:function(){

let that = this 
let json = {
  text:'',
  facePic:'../../../../../image/face.png',
  photo:'',
  voicePic:'',
  flag:'表情' 
}
 
 that.data.selfDatas.push(json)
that.setData({
  viewID:'toView',
  selfDatas:that.data.selfDatas
})
},

// func:添加照片
addAction:function(){
 
  let that = this 
wx.chooseImage({
  count: 9, // 最多可以选择的图片张数，默认9
  sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
  sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
  success: function(res){
  
let json = {
  text:'',
  facePic:'',
  photo:res.tempFilePaths[0],
  voicePic:'',
  flag:'照片'
}
  that.data.selfDatas.push(json)
that.setData({
viewID:'toView',
  selfDatas:that.data.selfDatas
})

  }
})


},



})