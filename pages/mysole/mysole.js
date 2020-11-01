// pages/collect/collect.js
const app = getApp();
// 设置数据库
const db = wx.cloud.database();
const collectDB = db.collection('UserInfo')
const merchandiseDB = db.collection('Merchandise')
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储商品数组 
    postList:[],
    postTime:""
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    console.log(this.openid = await getApp().getOpenid())
  },
  onLoad: function () {
    var that = this;
    collectDB.where({
      _openid:app.globalData.openId
    }).get({
      success: function (res) {
        var postlist_ = res.data[0].myPost;
        var sec = that;
        var postList = [];
        for(var i=0; i<postlist_.length; ++i)
        {
          merchandiseDB.where({
            _id:postlist_[i]
          }).get({
            success:function(res){
              postList.push(res.data[0])
              sec.setData({
                postList:postList
              })
            }
          })
        }
        that.setData({
          postList:postList,
        })
      }
    })   
  },
  filterTab: function (e) {
    var data = [true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },
 
  //筛选项点击操作
  filter: function (e) {
    wx.showLoading({
      tile: "请稍等"
    })
    var self = this, id = Number(e.currentTarget.dataset.id), txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    console.log(self.data.list)
    var list_=[]
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        if( id == 0 )
        {
          DB.get({
            success: res => {
              console.log("不限分类，得到的数据：", res.data)
              self.setData({
                list: res.data
              })
              self.sort()
            }
          })
        }
        else{
          DB.where({
            classification: id
          }).get({
            success: res => {
              console.log("筛选得到的数据为", res.data)
              self.setData({
                list: res.data
              })
              self.sort()
            }
          })
        }
        self.setData({
          tab: [true, true],
          tabTxt: tabTxt,
          classification_id: id,
          classification_txt: txt
        });
        break;
      case '1':
        console.log(self.data.list)
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true],
          tabTxt: tabTxt,
          sort_id: id,
          sort_txt: txt
        });
        self.sort()
        break;
    }
    wx.hideLoading()
  },
 
  //加载数据
  getDataList: function () {
    //调用数据接口，获取数据
 
  },
  
  collect: function(e){
    console.log('collect',e)
    const index = e.currentTarget.dataset.index
    const openId = app.globalData.openId;
    const userInfoId = app.globalData.userInfoId;
    var that = this
    var list_ = this.data.list
    var isCollected = e.currentTarget.dataset.status
    var collected = this.data.list[index].collected
    // 之前已经收藏了，现在是取消收藏
    if(isCollected)
    {
      for( var i = 0, length = collected.length; i < length; i++)
      {
        if(collected[i] == openId)
        {
          collected.splice(i, 1)
          break;
        }
      }
    }
    else
    {
      collected.push(openId)
    }
    // 操作收藏需要用户授权
    if(openId && app.globalData.userInfoId){
      //页面绑定的id在这里
      // 点击反转，局部数据渲染
      that.setData({
        ["list[" + index + "].isCollected"]: !isCollected,
        ["list[" + index + "].collected"]: collected
      })
      wx.cloud.callFunction({
        name:'updateCollect',
        data: {
          isCollected: isCollected,
          openId: openId,
          userInfoId: app.globalData.userInfoId,
          itemId: list_[index]._id,
          DBType: "Merchandise",
        },
        success: res => {              
          console.log("updateCollect云函数调用成功", res)
        },
        fail: err => {              
          console.error("updateCollect云函数调用失败", err)                         
        },          
      })
    }
    else {
      // 去授权页
      console.log("跳转回主页面", openId, app.globalData.userInfoId)
      wx.switchTab({
        url: '../homepage/homepage',
      })
    }
  },
  getDiffTime: function(date){
    return util.getDateDiff(date);
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接  
      urls: [e.target.dataset.src] // 需要预览的图片http链接列表  
    })
  },
  turnToPersonalPage: function (e) {
    wx.navigateTo({
      url: "/pages/personal/personal?id=",
    })
  },
  // 对data中的list做排序
  sort: function(){
    var self = this
    var list_ 
    console.log("调用了sort()")
    console.log(self.data.sort_id)
    switch(self.data.sort_id){
      case 0:{
        console.log("进入了case1")
        list_ = self.data.list
        list_.sort(util.compare("time", "desc"))
        self.setData({
          list: list_
        })
        break
      }
      case 1:{
        list_ = self.data.list
        list_.sort(util.compare("price", "asc"))
        self.setData({
          list: list_,
        })
        break
      }
      case 2:{
        list_ = self.data.list
        list_.sort(util.compare("price", "desc"))
        self.setData({
          list: list_
        })
        break
      }
      case '3':{
        list_ = self.data.list
        for(var i = 0, length = list_.length; i < length; i++)
        {
          list_[i].commentsLength = list_[i].comments.length
        }
        list_.sort(util.compare("commentsLength", "desc"))
        self.setData({
          list: list_
        })
        break;
      }
    }
  }
})