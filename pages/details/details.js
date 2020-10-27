// pages/details/details.js
const db = wx.cloud.database();
const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: [],
    focusInput: false,
    height: '',
    isInput: false


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
          item:item_
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

  previewImage: function (e) {
    let imgList = e.target.dataset.src;
    var now = e.target.dataset.index;
    var that = this;
    wx.previewImage({
      current: that.data.item.imageUrl[now], // 当前显示图片的http链接  
      urls: that.data.item.imageUrl // 需要预览的图片http链接列表  
    })
  },

  inputFocus(e) {
    console.log(e, '键盘弹起')
    this.setData({
      height: e.detail.height,
      isInput: true
    })
  },
  inputBlur() {
    console.log('键盘收起')
    this.setData({
      isInput: false
    })
  },
 
  focusButn: function () {
    this.setData({
      focusInput: true,
      isInput: true
    })
  },
})