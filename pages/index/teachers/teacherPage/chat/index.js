var socketOpen = false

Page({
  data:{
  hideSayBtn:"hidden",
  hideInput:"",
  selfDatas:[],
  facePic:'',
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载

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
  let sayBtnHide = that.data.hideSayBtn=="hidden" ? "" : "hidden"
 let inputHide = (sayBtnHide=="hidden"? "" : "hidden")
 
  that.setData({
    hideSayBtn:sayBtnHide,
    hideInput:inputHide
  })
},

// func:发送文字
sendTextAction:function(e){

  // 数组追加文字
let that = this
var tempArr = []
var json = {
  text:'',
  facePic:'',
  flag:'文本'
}
json.text = e.detail.value
 tempArr.push(json)
Array.prototype.push.apply(that.data.selfDatas, tempArr)
that.setData({
  selfDatas:that.data.selfDatas
})
},

// func:发送表情
faceAction:function(){
let that = this
var tempArr = []
var json = {
  text:'',
  facePic:'',
  flag:'表情'
}
json.facePic = "../../../../../image/face.png"
 tempArr.push(json)
 Array.prototype.push.apply(that.data.selfDatas, tempArr)
that.setData({
  selfDatas:that.data.selfDatas
})
}
})