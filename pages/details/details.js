// pages/details/details.js
const db = wx.cloud.database();
const util = require("../../utils/util.js");
const { getDateDiff } = require("../../utils/util.js");
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: [],
    height: '',
    commentContent: '',
    DBType: '',
    comments: [],
    focus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection(options.type).doc(options.id).get({
      success: function(res){
        console.log(res.data)
        var item_ = res.data;
        item_.time=item_.time.toLocaleDateString();
        for( var i = 0; i < item_.comments.length; i++ )
        {
          item_.comments[i].commentTime = util.getDateDiff(item_.comments[i].commentTime)
        }
        that.setData(
        {
          item:item_,
          DBType: options.type,
          comments: item_.comments
        })
      }
    });
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

  bindfocus: function(e) {

  },

  previewImage: function (e) {
    let imgList = e.target.dataset.src;
    var now = e.target.dataset.index;
    var that = this;
    wx.previewImage({
      current: that.data.item.imageUrl[now], // 当前显示图片的http链接  
      urls: that.data.item.imageUrl // 需要预览的图片http链接列表  
    })
  },
  
  contentBlur: function(e){
    this.setData({
      commentContent: e.detail.value.textarea
    })
  },

  submitComment: function(e){
    if(e.detail.value.input == "")
    {
      wx.showToast({
        title: '请输入内容后再发送',
        icon: "none"
      })
      return
    }
    this.setData({
      commentContent: e.detail.value.input
    })
    console.log('updateComment',e)
      const openId = app.globalData.openId;
      var that = this
      // 操作收藏需要用户授权
      if(openId){
        wx.showLoading({
          title: '发送中',
          mask: true
        })
        var obj = {}
        obj.commentContent =that.data.commentContent
        obj.commenterId = openId
        obj.commenterAvatar = app.globalData.userInfo.avatarUrl
        obj.commenterName = app.globalData.userInfo.nickName
        obj.commentTime = util.getDateDiff(new Date())
        wx.cloud.callFunction({
          name:'updateComment',
          data: {
            itemId: that.data.item._id,
            obj: obj,
            DBType: that.data.DBType
          },
          success: res => {              
            console.log("updateCommentt云函数调用成功", res);
            var comments = that.data.comments
            comments.push(obj)
            that.setData({
              comments: comments,
              focus: false
            })
            wx.hideLoading();
            wx.showToast({
              title: '发送成功'
            })
          },            
          fail: err => {              
            console.error("updateComment云函数调用失败", err) 
            wx.hideLoading()
            wx.showToast({
              title: '发送失败',
              image: '/image/icon/fail.png'
            })                     
          },   
        })
        that.setData({
          commentContent: ''
        })       
      }
      else {
        // 去授权页
        wx.switchTab({
          url: '../homepage/homepage',
        })
      }
  }
})