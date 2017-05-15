var index = 1 


let app = getApp()
Page({

  data: {

//1. 轮播图片数据
    imgUrls: [
      '../../image/home_banner1.png',
      '../../image/home_banner2.png',
      '../../image/home_banner3.png'
    ],

  
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
   index = 1
    
    // 3.请求数据
  this.reqData(1)
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
       index = index + 1

    // 2.请求数据
    this.reqData(index)
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

//2.提示框
let that = this
wx.showNavigationBarLoading()

//3. 请求数据
wx.request({
  url: app.serverUrl,
  data: {
     action: 'SearchNearTeachers' ,
     longitude: app.longitude ,
     latitude:  app.latitude ,
     distance: '10000000' ,
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
  return
}


 //1.追加数组元素：
  Array.prototype.push.apply(that.data.teachersData, res.data.value);
  
  //2. 绑定数据
  wx.hideNavigationBarLoading()
  that.setData({
   teachersData:that.data.teachersData
})  
  },

    fail: function(res) {
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

 // func:点击cell事件
tappedCellAction:function(e){
 
 let that = this
 let teacherData = that.data.teachersData[e.currentTarget.dataset.index]
 
 wx.navigateTo({ //跳转到老师主页
   url: 'teachers/teacherPage/index?TeacherID='+ teacherData.TeacherID
 })
}

})

   
