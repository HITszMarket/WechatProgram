<<<<<<< HEAD
//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  clearLogs:function(){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认清空所有记录？',
      success(res){
        if(res.confirm){
          wx.removeStorage({
            key: 'logs',
            success() {
              _this.setData({
                logs:[],
              })
            }
          })
        }
      }
    })
  }
})
=======
//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  clearLogs:function(){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认清空所有记录？',
      success(res){
        if(res.confirm){
          wx.removeStorage({
            key: 'logs',
            success() {
              _this.setData({
                logs:[],
              })
            }
          })
        }
      }
    })
  }
})
>>>>>>> LiYikai
