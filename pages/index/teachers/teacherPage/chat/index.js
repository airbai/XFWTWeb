var app = getApp()
var socketOpen = false
var voicePathArr = []
let footerH = 44
let photoPanH = 200
let itemW = 60
Page({
  data:{
    selfIcon:'',
    otherIcon:'',
  hideSayView:"hidden",
  hideInput:"",
  facePic:'',
  inputValue:'',
  scrollViewH:0,
  viewID:'toView',
  photoPanHeight:0,
  itemMarginLeft:0,

  // 聊天数据：默认出现老师的问候
  chatDatas:[
{
  text:"家长您好，有什么可以帮到您孩子的 ？😊",
  facePic:'',
  photo:'',
  voicePic:'',
  flag:'文本',
  tag:'other'
}
  ],

// 照片面板
   items:[
      {
       icon:"../../../../../image/album.png",
       text:'相册'
    },{
        icon:"../../../../../image/camera.png",
       text:'拍照'
    },{
        icon:"../../../../../image/video.png",
       text:'视频'
    },{
        icon:"../../../../../image/location.png",
       text:'位置'
    },{
       icon:"../../../../../image/redpacket.png",
       text:'红包'
    },{
        icon:"../../../../../image/call.png",
       text:'电话'
    },{
        icon:"../../../../../image/voice.png",
       text:'语音'
    },{
        icon:"../../../../../image/search.png",
       text:'收藏'
    }
  ],



//所在位置标记点:
map:{
markers: [{  
      iconPath: "../../../../../image/flag.png",
      id: 0,  //marker点击事件回调会返回此id
      latitude: 23.099994,
      longitude: 113.324520,
      title:'我的位置',
      width: 30, //图片宽度
      height: 30 //图片高度
    }],

    //路线(坐标点数组，从数组第一项连线至最后一项):
    polyline: [{ 
      points: [{ //经纬度数组:
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2, //线宽
      dottedLine: true //是否虚线
    }],

  //在地图上显示控件(比如返回、回到原点、退出)，控件不随着地图移动
    controls: [{
      id: 1,//在控件点击事件回调会返回此id
      iconPath: '../../../../../image/control.png',
      position: { //控件相对地图的位置
        right:5,
        bottom:5,
        width: 40,
        height: 40
      },
      clickable: true
    }]

}
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载

    // scroll-view初始高度
    this.setData({
      selfIcon:app.imageUrl+app.util.getLoginInfo().iconLink,
      otherIcon:app.imageUrl+options.PhoneLink,
      scrollViewH:app.windowHeight-footerH,
      itemMarginLeft: (app.windowWidth-itemW*4)/5
    })

    // 标题
 wx.setNavigationBarTitle({
   title: options.teacherName
 })

 // socek连接
  // this.connectSocket()

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
// 录音开始
wx.startRecord({
  success: function(res){
    // 将录音path存入数组
   voicePathArr.push(res.tempFilePath)
}
})

},


// func:松开手指，结束说话
bindtouchend:function(){

let that = this
wx.stopRecord({
  success: function(res){

// 渲染声音
that.reloadData('','../../../../../image/voice.png','语音','self','')

  }
})
},

// func: 播放录音
voicePicTap:function(e){

// 根据索引取出声音path
 var index = e.currentTarget.dataset.index
  var path = voicePathArr[index]
//  播放声音
  wx.playVoice({
    filePath: path,
    success: function(res){
     app.tip.showSuccess('播放录音成功')
     
    },
    fail: function(res) {
      app.tip.showError('播放录音失败') 
    }
  })
},

// func:发送文字
sendTextAction:function(e){

//没输入文字
if(e.detail.value==''){
  return
}

// 渲染文字
this.reloadData(e.detail.value,'','文本','self','')

//文字置空
this.setData({ inputValue:'', })
},


// func:发送表情
faceAction:function(){

this.reloadData('','../../../../../image/face.png','表情','self','')
},

// func:添加照片
addAction:function(){
 
  let that = this 

// 是否出现照片面板
var p =  (that.data.photoPanHeight==200) ? 0:200
var s = (that.data.scrollViewH ==(app.windowHeight-footerH))? (app.windowHeight-footerH-photoPanH):(app.windowHeight-footerH)

that.setData({
    photoPanHeight:p,
    scrollViewH:s
})


},


// func:照片面板所有box点击事件
boxAction:function(e){

let that = this
switch(e.currentTarget.dataset.index) {

    case 0: that.albumAction() //相册
    break;

    case 1: that.cameraAction() //拍照
    break; 

    case 2: that.videoAction() //视频
    break; 

     case 3: that.mapAction() //地图
    break; 

    case 4: that.redPacketAction() //红包
    break; 

    case 5: that.callAction() //电话
    break; 

    case 6: that.voiceAction() //语音
    break; 

    case 7: that.colletAction() //收藏
    break; 

default: 
 }


},


// func:相册
albumAction:function(){

let that = this
wx.chooseImage({
  count: 9, // 最多可以选择的图片张数，默认9
  sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
  sourceType: ['album'],
  success: function(res){
 
 that.reloadData('',res.tempFilePaths[0],'照片','self','')
  }
})
},

// func:拍照
cameraAction:function(){

let that = this
wx.chooseImage({
  count: 9, // 最多可以选择的图片张数，默认9
  sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
  sourceType: ['camera'], // album 从相册选图，camera 使用相机，默认二者都有
  success: function(res){

 that.reloadData('',res.tempFilePaths[0],'照片','self','')
  }
})
},


//func:视频
videoAction:function(){

  let that = this
wx.chooseVideo({
  sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
  // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
  camera: ['front', 'back'],
  success: function(res){
    that.reloadData('',res.tempFilePath,'视频','self','')
  },
  fail: function(res) {
  }
})
},

// function：地图
mapAction:function(){
  let that = this
   that.reloadData('','','地图','self',that.data.map)
},
  // func:点击地图上标记点时触发
  markertap(e) {
    console.log(e.markerId)
  },

// func:地图视野发生变化时触发
 regionchange(e) {
    console.log(e.type)
  },
  
  // func:点击地图控件时触发
  controltap(e) {
    console.log(e.controlId)
  },


// func:红包
redPacketAction:function(){
app.tip.showSuccess('暂无红包')
},

//func:电话
callAction:function(){
wx.makePhoneCall({
  phoneNumber: '10086',
  success: function(res) {
    // success
  }
})
},

//func:收藏
colletAction:function(){
app.tip.showSuccess('已收藏')
},

// func:渲染数据
reloadData:function(text,src,flag,tag,map){

let that = this
let item = {
  text:text,
  src:src,
  map:map,
  flag:flag,
  tag:tag
}
that.data.chatDatas.push(item)
that.setData({
viewID:'toView',
  chatDatas:that.data.chatDatas
})
},

})