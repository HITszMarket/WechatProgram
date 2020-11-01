// pages/homepage/homepage.js
const app = getApp()
const db = wx.cloud.database();
const userInfoDB = db.collection("UserInfo")


Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userOpenId: '',
    hasOpenId: false,
    userInfoId: '',
    hasUserInfoId: false,
    hasUserInfo: false,
    openid: '',
    myAddress:[
      {
        address:""
      }
    ],
    disAdr:[true],
    address: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  onLoad: function () {
    // 获取用户的信息和openId并存储到globalData和homepage的data中
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      if(app.globalData.openId) {
        this.setData({
          userOpenId: app.globalData.openId,
          hasOpenId: true
        })
      }
      else {
        app.getOpenId({
          success: res=> {
            app.globalData.openId = res.openId
            this.setData({
              userOpenId: res.openId,
              hasOpenId: true
            })
          }
        })
      }
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      if(app.globalData.openId) {
        this.setData({
          userOpenId: app.globalData.openId,
          hasOpenId: true
        })
      }
      else {
        app.getOpenId({
          success: res=> {
            app.globalData.openId = res.openId
            this.setData({
              userOpenId: res.openId,
              hasOpenId: true
            })
          }
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
      app.getOpenId({
        success: res=> {
          app.globalData.openId = res.openId
          this.setData({
            userOpenId: res.openId,
            hasOpenId: true
          })
        }
      })
    }
    // 将用户数据上传到数据库
    userInfoDB.where({
      openId: db.command.eq(this.data.userOpenId)
    }).get({
      complete(res){
        if(res.data.length == 0)
        {
          userInfoDB.add({
            data: {
              openId: app.globalData.openId,
              name: app.globalData.nickName,
              avatarUrl: that.data.userInfo.avatarUrl,
              collectMerchandise: [],
              collectHelp: [],
              collectTeamUp: [],
              myAddress:[],
              feedbacks:[]
            },
            success: function(res){
              console.log(res),
              app.globalData.userInfoId = res._id
              console.log("userInfoId:", res._id)
              that.setData({
                userInfoId: res._id,
                hasUserInfoId: true
              })
            },
            fail: function(res){
              console.error("用户信息上传失败")
            }
          })
        }
      }
    })
    var that = this;
    db.collection("UserInfo").where({
      openId:app.globalData.openId
    }).get({
      success:function(res){
        console.log(res.data[0].myAddress)
        var myAddress_ = res.data[0].myAddress
        console.log(myAddress_)
        that.setData({
          myAddress: myAddress_
        })
      }
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
    db.collection('UserInfo').where({
      openId: app.globalData.openId
    }).update({
      data: {
        myAddress: this.data.myAddress
      },
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
    db.collection('UserInfo').where({
      openId: app.globalData.openId
    }).update({
      data: {
        myAddress: this.data.myAddress
      },
    })
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
    db.collection('UserInfo').where({
      openId: app.globalData.openId
    }).update({
      data: {
        myAddress: this.data.myAddress
      },
    })
  }, 
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  community:function(){
    wx.navigateTo({
      url: '../community/community',
    })
  },
  toFeedback:function(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  toCollect:function(){
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  checkLogin:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  myPurchase:function(){
    wx.navigateTo({
      url: '../mypurchase/mypurchase',
    })
  },
  mySole:function(){
    wx.navigateTo({
      url: '../mysole/mysole',
    })
  }
})