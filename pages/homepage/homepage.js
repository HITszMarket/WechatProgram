// pages/homepage/homepage.js
const app = getApp()
<<<<<<< HEAD

Page({
  data: {
    motto: "说点什么呢？长按修改吧！",
    userInfo: {},
    address:"",
    dis_motto:true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

=======
const db = wx.cloud.database();
const userInfoDB = db.collection("UserInfo")


Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: "说点什么呢？长按修改吧！",
    userInfo: {},
    userOpenId: '',
    hasOpenId: false,
    userInfoId: '',
    hasUserInfoId: false,
    address:"",
    dis_motto:true,
    hasUserInfo: false,
    openid: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
>>>>>>> LiYikai
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  onLoad: function () {
<<<<<<< HEAD
=======
    // 获取用户的信息和openId并存储到globalData和homepage的data中
    var that = this
>>>>>>> LiYikai
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
<<<<<<< HEAD
=======
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
>>>>>>> LiYikai
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
<<<<<<< HEAD
=======
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
>>>>>>> LiYikai
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
<<<<<<< HEAD
    }
=======
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
            },
            success: function(res){
              console.log(res),
              app.globalData.userInfoId = res._id
              that.setData({
                userInfoId: res._id
              })
            },
            fail: function(res){
              console.error("用户信息上传失败")
            }
          })
        }
      }
    })
>>>>>>> LiYikai
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
<<<<<<< HEAD
=======
  
>>>>>>> LiYikai
  changeMottoStart:function(e){
    this.setData({
      dis_motto:false
    })
  },
  changeMottoEnd: function (e) {
    console.log(e.detail.value)
    var motto = this.data.motto;
    motto = e.detail.value;
    this.setData({
      motto: motto,
      dis_motto: true
    })
  },
  community:function(){
    wx.navigateTo({
      url: '../community/community',
    })
  },
  toAdvise:function(e){
    wx.navigateTo({
      url: '../advise/advise',
    })
  },
  toComplain:function(){
    wx.navigateTo({
      url: '../complain/complain',
    })
  },
  toSet:function(){
    wx.navigateTo({
      url: '../set/set',
    })
  },
  checkLogin:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  logOut:function(){
    console.log("asdasd");
  }
})