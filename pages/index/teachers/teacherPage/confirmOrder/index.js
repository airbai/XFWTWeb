Page({

  data:{

CourseTitle:"",
CourseType:"",
MinPrice:"",
PKID:"",
TeacherID:"",
totalPrice:'',
count: 1

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
  let that = this
  that.setData({

CourseTitle:options.CourseTitle,
CourseType:options.CourseType,
MinPrice:options.MinPrice,
PKID:options.PKID,
TeacherID:options.TeacherID,
totalPrice:options.MinPrice

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
//   onShareAppMessage: function() {
//     // 用户点击右上角分享
//     return {
//       title: 'title', // 分享标题
//       desc: 'desc', // 分享描述
//       path: 'path' // 分享路径
//     }
//   }

// function：加法事件
plusAction:function(){
let that = this
that.data.count = that.data.count + 1
that.setData({
    count:that.data.count,
    totalPrice: that.data.MinPrice * that.data.count
})
},

// function：减法事件
minusAction:function(){

let that = this
if (that.data.count == 1) return
that.data.count = that.data.count - 1
that.setData({
    count: that.data.count ,
    totalPrice:that.data.MinPrice * that.data.count
})
},

// func:提交订单
commitAction:function(){
  let that = this
wx.navigateTo({
  url: 'pay/index?totalPrice='+that.data.totalPrice
})
}
})