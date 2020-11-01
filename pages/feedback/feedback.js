// pages/complaint/complaint.js
const app = getApp();
// 设置数据库
const db = wx.cloud.database();
const feedbackCollection = db.collection("UserInfo")
Page({
  data: {
    feedbacks: [],
    openid:"",
    userInfo:null,
  },
  onLoad: function (options) {
    var that = this;
    db.collection("UserInfo").where({
      _openid:app.globalData.openId
    }).get({
      success:function(res){
        var feedbacks_ = res.data[0].feedbacks
        console.log(feedbacks_)
        that.setData({
          feedbacks: feedbacks_
        })
      }
    })
  },
  saveFeedback:function(e)
  {
    var feedbacks = this.data.feedbacks;
    var feedback =  e.detail.value.feedback;
    feedbacks.unshift(feedback);
    this.setData({
      feedbacks:feedbacks
    })
    db.collection('UserInfo').where({
      _openid:app.globalData.openId
    }).update({
      data: {
        feedbacks:this.data.feedbacks
      },
    })
  }
})