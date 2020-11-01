const app = getApp();
// 设置数据库
const db = wx.cloud.database();
const chatroomCollection = db.collection("chatroom")
var util = require('../../utils/util.js');

// pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowUserName: false,
    userInfo:null,
    textInputValue:"",
    chats:[],
    openid:""
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onLoad(){
    this.setData({
      openid:wx.getStorageSync("openid")
    })
  },

 onReady(){
   chatroomCollection.watch({
     onChange:this.onChange.bind(this),
     onError(err){
       console.log(err)
     }
   })
 },

 onChange(e){
   console.log(e)
   let that = this
  if(e.type=="init"){
    that.setData({
      chats:[
        ...that.data.chats,
        ...[...e.docs]
      ]
    })
  }else{
    const chats = [...that.data.chats]
    for(const docChange of e.docChanges){
      switch(docChange.queueType){
        case 'enqueue':
        chats.push(docChange.doc)
        break
      }
    }
    that.setData({
      chats:chats
    })
  }
 },
  sendMsg(){
    let that = this
      if(!that.data.textInputValue){
          return
      }

      const doc = {
        avatar: that.data.userInfo.avatarUrl,
        nickName:that.data.userInfo.nickName,
        msgText:"text",
        textContent:that.data.textInputValue,
        sendTime: util.formatTime(new Date())
 
      }
      chatroomCollection.add({
        data:doc,
      })
      that.setData({
        textInputValue:"" 
      })
    },

  getContent(e){
      this.data.textInputValue=e.detail.value
  },
  onGotUserInfo(e) {
    if (e.detail.userInfo) {
      var user = e.detail.userInfo;
      console.log(user)
      this.setData({
        userInfo: user,
        isShowUserName: true
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请授权登录',
      })
    }
  }
})