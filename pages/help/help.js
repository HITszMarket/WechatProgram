const app = getApp();
// 设置数据库
const db = wx.cloud.database();
const DB = db.collection('Help')
const util = require("../../utils/util.js");

Page({
  data: {
      // 存储商品数组 
      list:[],
      // 筛选框数据
      tabTxt: ['分类', '排序'],//分类
      tab: [true, true],
      classificationList: [
        { 'id': '1', 'title': '帮取快递' }, 
        { 'id': '2', 'title': '寻找技术宅' },
        { 'id': '3', 'title': '其他'}
        ],
      sortList: [
          {'id': '1', 'title': '价格升序'},
          {'id': '2', 'title': '价格降序'},
          {'id': '3', 'title': '新鲜度'}
        ],
      classification_id: 0,//品牌
      classification_txt: '',
      sort_id: 0,//分类方式
      sort_txt: ''
      },

  search: function (value) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
          }, 200)
      })
  },
  selectResult: function (e) {
      console.log('select result', e.detail)
  },
  filterTab: function (e) {
    var data = [true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },
   

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    console.log("userInfoId:", app.globalData.userInfoId)
    if(app.globalData.userInfoId == ''){
      console.log("enter")
      app.getUserInfoCallBack = res => {
        console.log("回调函数执行返回：",res)
      }
    }
    console.log("openId:",app.globalData.openId)
    if( app.globalData.openId == "")
      app.getOpenId({
        success: res =>{
          console.log("获取openId成功")
        },
        fail:res => {
          console.log("获取openId失败")
          wx.showToast({
            title: '当前处于离线状态',
            icon: "none"
          })
        },
        complete: res => {
          that.setData({
            dataReady: true
          })
        }
      }
      )
    const openId = app.globalData.openId;
    DB.get({
      success: function (res) {
        var list_ = res.data;
        console.log(res.data)
        console.log("check")
        for( var i = 0, length = list_.length; i < length; i++ )
        {
          list_[i].time_ = util.getDateDiff(list_[i].time);
        }
  
        for( var i = 0, list_length = list_.length; i < list_length; i++ )
        {
          for( var j = 0, collected_length = list_[i].collected.length; j < collected_length; j++ )
          {
            console.log("检查点赞情况：")
            console.log(list_[i].collected[j], openId)
            if( list_[i].collected[j] == openId)
            {
              list_[i].isCollected = true;
            }
            else
            {
              list_[i].isCollected = false;
            }
            console.log(list_[i].isCollected)
          }
        }
        for(var i = 0, length = list_.length; i < length; i++)
        {
          list_[i].commentsLength = list_[i].comments.length
        }
        that.setData({
          list:list_,
        })   
        that.sort()
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
            isCollected: !isCollected,
            openId: openId,
            userInfoId: app.globalData.userInfoId,
            itemId: list_[index]._id,
            DBType: "Help",
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
