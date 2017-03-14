Page({
  data:{
     cells:[
      {
       text:'修改密码'
    },{
       text:'反馈意见'
    },{
       text:'拨打客服'
    },{
       text:'清理缓存'
    }
  ],
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
  
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

cellTapAction:function(e){
  // 点击cell：
  switch(e.currentTarget.id) {

    case '0':  wx.navigateTo({ //修改密码
     url: 'modifyPwd/index'
  })    
    break;

    case '1':  wx.navigateTo({ //反馈意见
     url: 'sayOpinion/index'
  }) 
    break; 

    case '2':  wx.showModal({ //拨打客服
  title: '温馨提示',
  content: '您要拨打客服电话吗 ?',
  success: function(res) {
    if (res.confirm) {
    wx.makePhoneCall({ phoneNumber: '10086'})
    }
  }
})
    break; 

     case '3':  //清理缓存
      getApp().tip.showSuccess("清理完毕")
    break; 

default: 
 }
},

loginOutAction:function(){
  // 退出登录：

// 同步清理缓存
  try { wx.clearStorageSync()} catch(e) { }

// 跳转
wx.redirectTo({
  url: '../../login/index'
})
}
})