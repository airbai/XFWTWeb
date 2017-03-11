let app = getApp()
var isCollected = false
Page({
  data:{

// 1.菜单栏数据
  menuBoxs:[
      {  title:'课程' }, 
      { title:'简介'  }
  ],

    // 数据
    TeacherID:'',
     currentIndex : 0,
     courseDisplay:'',
     introDisplay:'none',
     courseData: [],
     baseInfoData:[],
     classData:[],
     educationData: [],
     workData: [],
    collectIcon:'../../../../image/collect.png',
    chatIcon:'../../../../image/chat.png',
 },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    let that = this
 that.setData({
  TeacherID:options.TeacherID
})

  // 请求数据：
  that.reqCourseData()
  that.reqTeacherData()
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
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },

   // function：菜单栏事件
tapMenuBox:function(e){
   
 var that = this

   that.setData({
     currentIndex: e.currentTarget.id,
    courseDisplay: (e.currentTarget.id == 0)? '':'none',
   introDisplay: (e.currentTarget.id == 1)? '':'none'

    })
},

// func:请求课程数据
reqCourseData:function(){
 
let that = this
wx.showNavigationBarLoading()
 
wx.request({
  url: app.serverUrl,
  data: {
     action: 'GetCourses' ,
     TeacherID: that.data.TeacherID ,
     VerSafe: getApp().VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

wx.hideNavigationBarLoading()

    // 请求失败
if(res.data.signIOS == 0){
 T.showError(res.data.value) 
  return
}

// 暂无更多数据
if(res.data.value.length == 0){
   wx.hideNavigationBarLoading() 
   T.showError("暂无课程数据")  
}
  
  //绑定数据
  that.setData({
   courseData:res.data.value
})  
  },fail: function(res) {
    
  }
})
},


 // func:请求老师简介数据
reqTeacherData:function(){

 let that = this
wx.showNavigationBarLoading()
 
wx.request({
  url: app.serverUrl,
  data: {
     action: 'GetUserDetailss' ,
     TeacherID: that.data.TeacherID ,
     type: 18,
     VerSafe: getApp().VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

wx.hideNavigationBarLoading()

    // 请求失败
if(res.data.signIOS == 0){
 T.showError(res.data.value) 
  return
}
  
  //绑定数据
  that.setData({
   baseInfoData:res.data.jsonUserInfo[0],
   classData:res.data.jsonTeachClassInfo[0],
   educationData:res.data.jsonEducationExperience[0],
   workData:res.data.jsonWorkExperience[0]
})  
  },fail: function(res) { }
})
},

// func:报名事件
joinAction:function(e){

  let that = this
let data = that.data.courseData[e.currentTarget.id]
wx.navigateTo({
  url: 'confirmOrder/index?TeacherID='+data.TeacherID+"&PKID="+data.PKID+"&CourseType="+data.CourseType+ "&CourseTitle="+data.CourseTitle+ "&MinPrice="+data.MinPrice
})
},

// function：收藏事件
collectAction:function(e){  

let icon = (isCollected==false)?'../../../../image/collected.png':'../../../../image/collect.png'

let that = this
 that.setData({
 collectIcon:icon
 })


let text = (isCollected==false)?'已收藏':'取消收藏'
app.tip.showSuccess(text)
 
  isCollected = !isCollected
},

// function：聊天事件
chatAction:function(e){  
 
},

})