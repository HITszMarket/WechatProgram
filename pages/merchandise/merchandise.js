const app = getApp();
// 设置数据库
const db = wx.cloud.database();
const merchandiseDB = db.collection('Merchandise')
const util = require("../../utils/util.js");

Page({
  data: {
      // 存储商品数组 
      list:[],
      postTime:"",
      // 筛选框数据
      tabTxt: ['分类', '价格', '排序'],//分类
      tab: [true, true, true],
      classificationList: [
        { 'id': '1', 'title': '生活用品' }, 
        { 'id': '2', 'title': '学习用品' },
        { 'id': '3', 'title': '电子产品'},
        { 'id': '4', 'title': '其他'}
      ],
      priceList:[
        {'id': '1', 'title': '0-49'},
        {'id': '2', 'title': '50-99'},
        {'id': '3', 'title': '100-199'},
        {'id': '4', 'title': '200元以上'}
      ],
      sortList: [
          {'id': '1', 'title': '价格升序'},
          {'id': '2', 'title': '价格降序'},
          {'id': '3', 'title': '新鲜度'}
      ],
      classification_id: 0,//品牌
      classification_txt: '',
      price_id: 0,//价格
      price_txt: '',
      sort_id: 0,//排序
      sort_txt: '',
  },
 
  onLoad() {
      this.setData({
          search: this.search.bind(this)
      })
  },

  onLoad: async function () {
    console.log(this.openid = await getApp().getOpenid())
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
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    const openId = app.globalData.openId;
    merchandiseDB.get({
      success: function (res) {
        var list_ = res.data;
        for( var i = 0, length = list_.length; i < length; i++ )
        {
          list_[i].time = util.getDateDiff(list_[i].time);
        }
        for( var i = 0, merchandise_length = list_.length; i < merchandise_length; i++ )
        {
          for( var j = 0, collected_length; j < collected_length; j++ )
          {
            if( list_[i].collected[j] == openId)
            {
              list_[i].isCollected = true;
            }
            else
            {
              list_[i].isCollected = false;
            }
          }
        }
        that.setData({
          list:list_,
        })   
      }
    })
  },
    filterTab: function (e) {
      var data = [true, true, true], index = e.currentTarget.dataset.index;
      data[index] = !this.data.tab[index];
      this.setData({
        tab: data
      })
    },
   
    //筛选项点击操作
    filter: function (e) {
      var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
      switch (e.currentTarget.dataset.index) {
        case '0':
          tabTxt[0] = txt;
          self.setData({
            tab: [true, true, true],
            tabTxt: tabTxt,
            classification_id: id,
            classification_txt: txt
          });
          break;
        case '1':
          tabTxt[1] = txt;
          self.setData({
            tab: [true, true, true],
            tabTxt: tabTxt,
            price_id: id,
            price_txt: txt
          });
          break;
        case '2':
          tabTxt[2] = txt;
          self.setData({
            tab: [true, true, true],
            tabTxt: tabTxt,
            sort_id: id,
            sort_txt: txt
          });
          break;
      }
      //数据筛选
      self.getDataList();
    },
   
    //加载数据
    getDataList: function () {
      //调用数据接口，获取数据
   
    },

    // //点击收藏图标
    // clickCollectTap: function(){
    //   var click_ = this.data.click;
    //   click_=!click_;
    //   this.setData({
    //     click: click_
    //   })
    // },

    collect: function(e){
      console.log('collect',e)
      const openId = app.globalData.openId;
      var that = this
      var list_ = this.data.list
      var isCollected = e.currentTarget.dataset.status
      // 操作收藏需要用户授权
      if(openId){
        //页面绑定的id在这里
        const index = e.currentTarget.dataset.index
        // 已经收藏过了就是取消收藏
        list_[index].isCollected=!isCollected;
        that.setData({
          list:list_
        })
        wx.cloud.callFunction({
          name:'updateCollect',
          data: {
            isCollected: isCollected,
            userId: openId,
            merchandiseId: list_[index]._id
          },
          success: res => {              
            console.log("updateCollect云函数调用成功", res)
          },            
          fail: err => {              
            console.error("updateCollect云函数调用失败", err)                         
          },          
        })
          // merchandiseDB.doc(list_[index]._id).update({
          //   data:{
          //     "collected": db.command.pullAll([openId])
          //   },
          //   success(res){
          //     console.log("取消收藏更新数据库成功", res)
          //   },
          //   fail(res){
          //     console.error("取消收藏更新数据库失败", res)
          //   },
          //   compelete(res){
          //     console.log("结束取消收藏更新数据库", res)
          //   }
          // })
        

          // console.log(list_[index]._id)
          // merchandiseDB.doc(list_[index]._id).update({
          //   data:{
          //     "collected": db.command.push([[openId]])
          //   },
          //   success(res){
          //     console.los("收藏更新数据库成功", res)
          //   },
          //   fail(res){
          //     console.log("收藏更新数据库失败", res)
          //   },
          //   compelete(res){
          //     console.log("结束收藏更新数据库", res)
          //   }
          // })
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
    }
  })
