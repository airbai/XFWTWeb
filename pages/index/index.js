
Page({

  data: {

//1. 轮播图片数据
    imgUrls: [
      '../../image/home_banner1.png',
      '../../image/home_banner2.png',
      '../../image/home_banner3.png'
    ],

//2. 轮播配置
    autoplay:true,
    interval: 3000,
    duration: 1200,
  
  // 3.导航栏
  navs: [
    {
        image: '../../image/home_entity.png',
        text: '培学',
        id:1
      },

       {
        image: '../../image/home_play.png',
        text: '培优',
        id:2
      },

      
       {
        image: '../../image/home_door.png',
        text: '培特',
        id:3
      }
    ],

 
        teachersData:[ ],
        loadingHide:false,
        index: 1 ,

  },


  onLoad:function(options){
    // 生命周期函数--监听页面加载
  this.reqData(1)


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

    // 1.清空数组
    this.data.teachersData = []

// 2.重新赋值页码
 this.data.index = 1
    
    // 3.请求数据
  this.reqData(1)
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
       this.data.index = this.data.index + 1

    // 2.请求数据
    this.reqData(this.data.index)
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },

  // func:请求数据：
reqData:function(index){

//1.调用网络模板获取md5加密后的字符串
 let networkTemplate = require('../../utils/network.js'); 
let UpperMd5Str = networkTemplate.getUpperMd5Str()


//2.提示框
let that = this
  that.setData({
   loadingHide:false
})

//3. 请求数据
wx.request({
  url: getApp().globalData.serverUrl,
  data: {
     action: 'SearchNearTeachers' ,
     longitude: getApp().globalData.longitude ,
     latitude:  getApp().globalData.latitude ,
     distance: '1000' ,
     pageIndex: index,
     pageSize: '15' ,
     VerSafe: UpperMd5Str
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

 //1.追加数组元素：
  Array.prototype.push.apply(that.data.teachersData, res.data.value);
  
  //2. 绑定数据
  that.setData({
   teachersData:that.data.teachersData,
   loadingHide:true
})  
  },

    fail: function(res) {
    console.log(res.data)
  }
})

},

// function:点击了课程分类view
clickedBoxView: function(event) {
  
 let id =  event.currentTarget.id
 let titleType =  event.currentTarget.dataset.type
//跳转到周边老师页面
wx.navigateTo({ 
  url: 'teachers/index?id='+id+'&titleType='+titleType
})
},

})

   
