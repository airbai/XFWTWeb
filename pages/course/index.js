
//  不要在 onLaunch 的时候调用 getCurrentPage()此时 page 还没有生成。 
// getCurrentPage是获取当前页面的实例对象。

var indexPage = 1
var  currentPage = 0
var app = getApp()
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
     teachersData: [],
     loadingHide:false,
     nodataImgShow:false
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
    indexPage = 1
    
    // 3.请求数据
    this.reqData(1,this.data.currentID,this.data.currentID)

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    indexPage =  indexPage + 1

    // 2.请求数据
    this.reqData( indexPage,this.data.currentID,this.data.currentID)
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
 
 currentPage = e.currentTarget.id
 indexPage = 1
   this.setData({
     currentID: e.currentTarget.id,
     
     
     teachersData:[]
    })

    this.reqData(1,e.currentTarget.id,e.currentTarget.id)
},


// func:请求数据：
reqData:function(index,recommendType,teacherType){

//提示框
var that = this

  that.setData({
   loadingHide:false
})

//3. 请求数据
wx.request({
  url: app.serverUrl,
  data: {
     action: 'GetSpecialTeachers' ,
     RecommendType: recommendType ,
     TeacherType: teacherType,
     pageIndex: index,
     pageSize: '15' ,
     VerSafe: app.VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

    // 请求失败
if(res.data.signIOS == 0){
 app.tip.showError(res.data.value) 
  that.setData({
   nodataImgShow:true
 })
  return
}

// 暂无更多数据
if(res.data.value.length == 0){
     that.setData({
   loadingHide:true
}) 
   app.tip.showError("暂无更多数据")  
}

     //1.追加数组元素：
  Array.prototype.push.apply(that.data.teachersData, res.data.value);

  //2. 绑定数据
  that.setData({
   teachersData:that.data.teachersData,
   loadingHide:true,
    nodataImgShow:(that.data.teachersData.length > 0) ? false:true
})  
  },

    fail: function(res) {
  
  }
})

}


})


 