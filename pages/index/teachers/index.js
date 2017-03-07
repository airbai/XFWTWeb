var index = 1
Page({

  data:{
        teachersData:[ ],
        loadingHide:false,
        nodataImgShow:false
  },

  
  onLoad:function(options){
    // 生命周期函数--监听页面加载

  wx.setNavigationBarTitle({
    title: options.titleType
  })

    this.reqData(1,options.id,options.id)

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

    //  3.请求数据：
    this.reqData(1,1,1)
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
     
    index = index + 1

    // 2.请求数据
    this.reqData(index,1,1)
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '学富网老师', // 分享标题
      desc: 'Wong分享了一个好老师给您!', // 分享描述
      path: 'path' // 分享路径
    }
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
  url: getApp().serverUrl,
  data: {
     action: 'GetSpecialTeachers' ,
     RecommendType: recommendType ,
     TeacherType: teacherType,
     pageIndex: index,
     pageSize: '15' ,
     VerSafe: getApp().VerSafe
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {

    // 请求失败
if(res.data.signIOS == 0){

 getApp().tip.showError(res.data.value) 
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
   getApp().tip.showError("暂无更多数据")  
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
    console.log(res.data)
  }
})

},

tappedCellAction:function(e){
  // func:点击cell事件
  var that = this
 let teacherData = that.data.teachersData[e.currentTarget.dataset.index]
 let PhoneLink = 'PhoneLink=' + teacherData.PhoneLink +'&'
 let TeacherName = 'TeacherName=' + teacherData.TeacherName +'&'
 let TeachFeature = 'TeachFeature=' + teacherData.TeachFeature +'&'
 let StuCount = 'StuCount=' + teacherData.StuCount +'&'
 let CourseCount = 'CourseCount=' + teacherData.CourseCount +'&'
 let CommentCount = 'CommentCount=' + teacherData.CommentCount +'&'
 let TeacherID = 'TeacherID=' + teacherData.TeacherID
 
 wx.navigateTo({
   url: 'teacherPage/index?'+ PhoneLink+TeacherName+TeachFeature+StuCount+CourseCount+CommentCount+TeacherID
 })
}


})


