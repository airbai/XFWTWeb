let app = getApp()

Page({
  data:{

// 1.菜单栏数据
  menuBoxs:[
      {
       title:'课程',
       orderStatus: -1
    },
      {
       title:'简介',
       orderStatus: 0
    }
  ],

    // 3.box数据
     currentIndex : 0,
     courseDisplay:'',
     introDisplay:'none',
    //  orderStatus: -1,
    //  teachersData: [],
    //  loadingHide:false,
    //  indexPage:1,

  PhoneLink:'',
  TeacherName:'',
  TeachFeature:'',
  StuCount:'',
  CourseCount:'',
  CommentCount:'',
  TeacherID:''


  
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    let that = this
 that.setData({
  PhoneLink:app.imageUrl + options.PhoneLink,
  TeacherName:options.TeacherName,
  TeachFeature:options.TeachFeature,
  StuCount:options.StuCount,
  CourseCount:options.CourseCount,
  CommentCount:options.CommentCount,
  TeacherID:options.TeacherID
})
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
tapMenuBox:function(e){
    // 菜单栏事件
 var that = this

 
   that.setData({
     currentIndex: e.currentTarget.id,
    courseDisplay: (e.currentTarget.id == 0)? '':'none',
  introDisplay: (e.currentTarget.id == 1)? '':'none'
    //  orderStatus: e.currentTarget.dataset.orderstatus,
    //  indexPage:1,
    //  teachersData:[]
    })

    // that.reqData(1,that.data.orderStatus)
},
})