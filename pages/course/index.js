
//  不要在 onLaunch 的时候调用 getCurrentPage()此时 page 还没有生成。 
// getCurrentPage是获取当前页面的实例对象。

Page({

    data:{

// 1.菜单栏数据
  menuItems:[
      {
       courseName:'学前老师',
       id:'1'
    },
      {
       courseName:'资深老师',
       id:'2'
    },
      {
       courseName:'外国教师',
       id:'3'
    }
  ],

    // 3.item数据
     currentID : '1',
     currentPage:0,
     teachersData: [],
     loadingHide:false,
     indexPage:1
 },

// 方法： ---------------------------
 onLoad:function(options){
    // 生命周期函数--监听页面加载
   this.reqData(1,1,1)
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
    this.data.indexPage = 1
    
    // 3.请求数据
    this.reqData(1,this.data.currentID,this.data.currentID)

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    this.data.indexPage = this.data.indexPage + 1

    // 2.请求数据
    this.reqData(this.data.indexPage,this.data.currentID,this.data.currentID)
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },


// 3.点击菜单栏
tapMenuItem:function(e){
 
   this.setData({
     currentID: e.currentTarget.id,
     currentPage: e.currentTarget.id,
     indexPage:1,
     teachersData:[]
    })

    this.reqData(1,e.currentTarget.id,e.currentTarget.id)
},


// func:请求数据：
reqData:function(index,recommendType,teacherType){

//1.调用网络模板获取md5加密后的字符串
 var networkTemplate = require('../../utils/network.js'); 
 var UpperMd5Str = networkTemplate.getUpperMd5Str()


//2.提示框
var that = this

  that.setData({
   loadingHide:false
})

//3. 请求数据
wx.request({
  url: getApp().globalData.serverUrl,
  data: {
     action: 'GetSpecialTeachers' ,
     RecommendType: recommendType ,
     TeacherType: teacherType,
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

}


})


 