
//  不要在 onLaunch 的时候调用 getCurrentPage()此时 page 还没有生成。 
// getCurrentPage是获取当前页面的实例对象。

Page({
  
    data:{

picture: "../../image/0414couser.png",
name: "Wong",
       
// 1.菜单栏数据
  items:[
      {
       icon:'../../image/my_order@2x.png',
       text:'我的订单'
    },{
        icon:'../../image/my_teacher@2x.png',
       text:'我的老师'
    },{
        icon:'../../image/my_collecte@2x.png',
       text:'我的收藏'
    },{
        icon:'../../image/0128award@2x.png',
       text:'我的钱包'
    },{
        icon:'../../image/my_about@2x.png',
       text:'关于学富'
    },{
        icon:'../../image/my_wallet@2x.png',
       text:'我的设置',
    }
  ],
 },

// 触摸头像事件：
    tapImageView:function(){
  wx.navigateTo({
     url: 'personalPage/index'
  })
    },

    // 所有item的点击事件：
    itemTap:function(e){
         
switch(e.currentTarget.id) {

    case '0':  wx.navigateTo({ //我的订单
     url: 'myOrder/index'
  })    
    break;

    case '1':  wx.navigateTo({ //我的老师
     url: 'myTeacher/index'
  }) 
    break; 

    case '2':  wx.navigateTo({ //我的收藏
     url: 'myCollect/index'
  }) 
    break; 

     case '3':  wx.navigateTo({ //我的钱包
     url: 'myWallet/index'
  }) 
    break; 

    case '4':  wx.navigateTo({ //关于学富
     url: 'aboutXF/index'
  }) 
    break; 

    case '5':  wx.navigateTo({ //我的设置
     url: 'mySet/index'
  }) 
    break; 

default: 
 }

      
    }
})
