const app = getApp();
// 设置数据库
const db = wx.cloud.database();

Page({
  data: {
      // 存储商品数组 
      list:[],
      // 筛选框数据
      tabTxt: ['分类', '价格', '排序'],//分类
      tab: [true, true, true],
      classificationList: [
        { 'id': '1', 'title': '数码产品' }, 
        { 'id': '2', 'title': '日常用品' },
        { 'id': '3', 'title': '食物'}
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

    //点击收藏图标
    clickCollectTap: function(){
      var click_ = this.data.click;
      click_=!click_;
      this.setData({
        click: click_
      })
    }
  })
