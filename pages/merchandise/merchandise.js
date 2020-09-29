const app = getApp();

/* 云服务器与云数据库初始化*/
wx.cloud.init({
  env: "market-nat7h"
})

const db = wx.cloud.database();


Page({
  data: {
      list:[],

      // demo
      tabTxt: ['分类', '价格', '热度'],//分类
      tab: [true, true, true],
      pinpaiList: [{ 'id': '1', 'title': '品牌1' }, { 'id': '1', 'title': '品牌1' }],
      pinpai_id: 0,//品牌
      pinpai_txt: '',
      jiage_id: 0,//价格
      jiage_txt: '',
      xiaoliang_id: 0,//销量
      xiaoliang_txt: ''
      },
 
  onLoad() {
      this.setData({
          search: this.search.bind(this)
      })
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
    db.collection('Merchandise').get({
      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
          console.log(res.data);

          that.setData(
          {
            list:res.data,
          //res代表success函数的事件对，data是固定的，list是数组
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
            pinpai_id: id,
            pinpai_txt: txt
          });
          break;
        case '1':
          tabTxt[1] = txt;
          self.setData({
            tab: [true, true, true],
            tabTxt: tabTxt,
            jiage_id: id,
            jiage_txt: txt
          });
          break;
        case '2':
          tabTxt[2] = txt;
          self.setData({
            tab: [true, true, true],
            tabTxt: tabTxt,
            xiaoliang_id: id,
            xiaoliang_txt: txt
          });
          break;
      }
      //数据筛选
      self.getDataList();
    },
   
    //加载数据
    getDataList: function () {
      //调用数据接口，获取数据
   
   
    }
  })
