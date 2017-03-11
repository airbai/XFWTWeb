var payText = "wechat"

Page({
  data:{
    totalPrice:''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    let that = this
    that.setData({
     totalPrice: options.totalPrice
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

radioChange:function(e){
  //func: 改变了支付方式就会调用此方法：
payText = e.detail.value
},


sureAction:function(){
  // func:确认支付
if(payText=="wechat"){  //微信
this.wxPay()
}else if(payText=="alipay"){ //支付宝
console.log("支付宝")
}
},

wxPay:function(){
  //func:微信预支付api，也叫统一下单api

  wx.request({
    url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    data: {
appid:"wx2de3d13dd62961a7",
mch_id:"1289399601",
nonce_str:Math.random().toString(36).substr(2, 15) ,
sign:"",
body:"六年级英语课程"

    },
    method: 'GET', 
    success: function(res){
      // success
    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      // complete
    }
  })

}

})