const app = getApp()

Page({
  data: {
    motto:"还未布控函数实现全局链接",
    userInfo: {},
    address: "",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myAddress:[{
      address:""
    }],
    disAdr:[true],
    types:[
      {
        index:0,
        name:"订单消息 (商品被他人收藏时发送通知)"
      },
      {
        index:1,
        name:"组队消息 (他人发起您感兴趣的活动时发送通知）"
      },
      { 
        index:2,
        name:"委托消息(他人接受委托/ 发起委托时发送通知)"
      },
      {
        index:3,
        name:"聊天信息 (他人向您发起私人聊天时发送通知)"
      },
      {
        index:4,
        name:"客服消息 (客服小鲜肉随时可撩)"
      }
    ],
    typeCheckedList:[]
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang: "zh_CN",
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  addressInput:function(event){
    var index = event.currentTarget.dataset.index;
    var disadr = this.data.disAdr;
    disadr[index] = false;
    this.setData({
      disAdr:disadr
    })
  },
  addressInputEnd:function(event){
    var index = event.currentTarget.dataset.index;
    var address = event.detail.value;
    var myaddress = this.data.myAddress;
    var disadr = this.data.disAdr;
    disadr[index] = true;
    myaddress[index].address = address;
    this.setData({
      disAdr: disadr,
      myAddress: myaddress
    })
  },
  addAddress: function () {
    var that = this;
    setTimeout(function(){
      if(that.data.myAddress[that.data.myAddress.length-1].address != "" && that.data.myAddress[that.data.myAddress.length-1].address != null){
      var myaddress = that.data.myAddress;
      var disadr = that.data.disAdr;
      var newaddress = {
        address:""
      };
      var newdisadr = true;
      myaddress.push(newaddress);
      disadr.push(newdisadr);
      that.setData({
        myAddress:myaddress,
        disAdr:disadr
      })  
      }else{
        wx.showModal({
          title: '提示',
          content: '地址不能为空，请输入您的常在地址'
        })
      }
    }, 100)
  },
  delAddress: function (event) {
    if(this.data.myAddress.length == 1){
      wx.showModal({
        title: '提示',
        content: '当前仅有一个常在地址，不能删除',
      })
      return;
    }
    const index = event.currentTarget.dataset.index;
    let myaddress = this.data.myAddress;
    let disadr = this.data.disAdr;
    myaddress.splice(index, 1);
    disadr.splice(index, 1);
    this.setData({
      myAddress: myaddress,
      disAdr: disadr
    })
  },  
  selectChange:function(e){
    const typechecklist = e.detail.value;
    this.setData({
      typeCheckedList:typechecklist
    })
  } 
})