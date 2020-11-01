// pages/mypurchase/mypurchase.js
// pages/collect/collect.js
const app = getApp();
// 设置数据库
const db = wx.cloud.database();
const merchandiseDB = db.collection('Merchandise')
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    console.log(this.openid = await getApp().getOpenid())
  },
  onLoad: function () {
    var that = this;
    const openId = app.globalData.openId;
    merchandiseDB.where({
      /*collected:openId*/
    }).get({
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
})