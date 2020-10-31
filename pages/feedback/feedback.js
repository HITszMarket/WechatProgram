// pages/complaint/complaint.js
const app = getApp();
// 设置数据库
const db = wx.cloud.database();
const feedbackCollection = db.collection("feedback")
Page({
  data: {
    feedback:"",
    feedbacks: [],
    openid:"",
    userInfo:null,
  },
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid');
    var feedbacks = wx.getStorageSync('feedbacks');
    this.setData({
      feedbacks:feedbacks
    })
  },
  saveFeedback:function(e)
  {
    var taht = this;
    if(e.detail.value)
    {
      var feedback = e.detail.value;
      var feedbacks = this.data.feedbacks;
      console.log(feedback);
      feedbacks.unshift(feedback);
      this.setData({
        feedbacks:feedbacks,
        feedback:""
      })
      wx.setStorageSync('feedbacks', feedbacks)
    }
    else
      wx.showModal({
        cancelColor: 'red',
        confirmColor: 'black',
        title: '提示',
        content: '内容为空'
      })
  }
})