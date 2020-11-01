const util = require('../../utils/util.js')
var app = getApp()
//选择器

// 选项卡类
  Page({
    //单选器
    onShareAppMessage() {
      return {
        title: 'radio',
        path: 'page/component/pages/radio/radio'
      }
    },

    data:{
      winWidth: 0,
      winHeight: 0,
      // tab切换
      currentTab: 0,
      
      date: '2020-11-03',

      items: [
        {value: 'new', name: '新商品'},
        {value: 'old', name: '旧商品', checked: 'true'},
      ],
      
      itemstwo: [
        {value: 'express', name: '  取快递'},
        {value: 'technology', name: '抱大腿', checked: 'true'},
        {value: 'others', name: ' 其他的'},
      ],
      
      itemsthree: [
        {value: 'class', name: '课堂项目'},
        {value: 'race', name: '文体活动', checked: 'true'},
        {value: 'comption', name: '竞赛组队'},
      ],

      multiArray: [['生活用品', '学习用品','电子产品', '其他'], ['使用类', '食物'], ['洗护', '洁面','化妆品','酒精消毒棉','其他']],
      multiIndex: [0, 0, 0],
      objectMultiArray: [
        [
          {
            id: 0,
            name: '生活用品'
          },
          {
            id: 1,
            name: '学习用品'
          },
          {
            id: 2,
            name: '电子产品'
          },
          {
            id: 3,
            name: '其他'
          }
        ], 
        [
          {
            id: 0,
            name: '实用类'
          },
          {
            id: 1,
            name: '食物'
          },
          {
            id: 2,
            name: '其他'
          }
        ], 
        [
          {
            id: 0,
            name: '洗护'
          },
          {
            id: 1,
            name: '洁面'
          },
          {
            id: 2,
            name: '化妆品'
          },
          {
            id: 3,
            name: '酒精消毒棉'
          },
          {
            id: 4,
            name: '其他'
          }
        ]
      ],

      //下拉框
      options: [{
        city_id: '001',
        city_name: '新商品'
      }, {
        city_id: '002',
        city_name: '旧商品'
      }
      ],
      selected:{} ,

      //上传的数组
      type:[],//商品类型,需要和index以及思维导图对应
      price_merchandise: 0,//商品价格
      //selected商品状况数组，在上面了
      //我们有chosseImgs和textVal，来自上传界面
      //data，时间
    },

    //单选器部分*3
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
  
      const items = this.data.items
      for (let i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value === e.detail.value
      }
  
      this.setData({
        items
      })
    },

    radioChangetwo(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
  
      const itemstwo = this.data.itemstwo
      for (let i = 0, len = itemstwo.length; i < len; ++i) {
        itemstwo[i].checked = itemstwo[i].value === e.detail.value
      }
  
      this.setData({
        itemstwo
      })
    },

    radioChangethree(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
  
      const itemsthree = this.data.itemshree
      for (let i = 0, len = itemsthree.length; i < len; ++i) {
        itemsthree[i].checked = itemsthree[i].value === e.detail.value
      }
  
      this.setData({
        itemsthree
      })
    },

    //商品界面的类型1
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
    }, 
    //商品界面类型2 
    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (data.multiIndex[0]) {
            case 0:
              data.multiArray[1] = ['使用类', '食物'];
              data.multiArray[2] = ['洗护', '洁面','化妆品','酒精消毒棉','其他'];
              break;
  
            case 1:
              data.multiArray[1] = ['教材', '参考书', '学习文具'];
              data.multiArray[2] = ['编程', '数学类','其他'];
              break;
            
            case 2:
              data.multiArray[1] = ['手机', '平板', '小物件'];
              data.multiArray[2] = ['苹果', '安卓系统','其他'];
              break;

            case 3:
              data.multiArray[1] = ['周边', '门票', '点券'];
              data.multiArray[2] = ['比如，洛天依？', '其他'];
              break;
          }
          data.multiIndex[1] = 0;
          data.multiIndex[2] = 0;
          break;
  
  
  
        case 1:
          switch (data.multiIndex[0]) {
            case 0:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['洗护', '洁面','化妆品','酒精消毒棉','其他'];
                  break;
  
                case 1:
                  data.multiArray[2] = ['膨化食品','饮品','保健品','其他'];
                  break;

              }
              break;
  
  
            case 1:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['编程', '数学类','其他'];
                  break;
  
                case 1:
                  data.multiArray[2] = ['C primer plus', '剑指offer','线性代数习题解答','其他'];
                  break;
  
                case 2:
                  data.multiArray[2] = ['草稿纸', '笔', '墨水','其他'];
                  break;

              
              }
              break;
  
            
            case 2:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['苹果', '安卓系统','其他'];
                  break;
  
                case 1:
                  data.multiArray[2] = ['无细分'];
                  break;
  
                case 2:
                  data.multiArray[2] = ['鼠标', '充电器/线', '其他'];
                  break;
              }
            break;

            case 3:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['必如，洛天依？', '其他'];
                  break;
  
                case 1:
                  data.multiArray[2] = ['演唱会','参观','其他'];
                  break;
  
                case 2:
                  data.multiArray[2] = ['王者', '联盟', '其他'];
                  break;
              }
            break;
          }
          data.multiIndex[2] = 0;
          break;
      }
      console.log(data.multiIndex);
      this.setData(data);
    },

    //传递图片界面的图片数组和文本变量
    onLoad: function(options) {
      var that = this;
   
      /**
       * 获取系统信息
       */
      wx.getSystemInfo( {
   
        success: function( res ) {
          that.setData( {
            winWidth: res.windowWidth,
            winHeight: res.windowHeight
          });
        }
      });

      var textVal = options.textVal;
      var chooseImgs = JSON.parse(options.chooseImgs)
      console.log(options.textVal)
      console.log(chooseImgs)
      this.setData({
        textVal:textVal
      })
    },

    /**
       * 滑动切换tab
       */
    bindChange: function( e ) {
   
      var that = this;
      that.setData( { currentTab: e.detail.current });
   
    },

    /**
     * 点击tab切换
     */
    swichNav: function( e ) {
   
      var that = this;
   
      if( this.data.currentTab === e.target.dataset.current ) {
        return false;
      } else {
        that.setData( {
          currentTab: e.target.dataset.current
        })
      }
    },
    //跳转到上传图片界面
    aa:function(){
      wx.navigateTo({
        url:'../post/index'
      })
    },

    //限制数字*2
    bindinputPrice(e) {
      this.setData({
        price_merchandise: e.detail.value
      })
    },
    validateNumber(val) {
      return val.replace(/\D/g, '')
    },

    //日期选项卡
    bindDateChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
    },
    
    //下拉框    
    change (e) {
      this.setData({
        selected: { ...e.detail }
      })
      wx.showToast({
        title: `${this.data.selected.id} - ${this.data.selected.name}`,
        icon: 'success',
        duration: 1000
      })
    },
    close () {
      // 关闭select
      this.selectComponent('#select').close()
    },

    //点击商品提交按钮
    button_goods: function(e){
      
    },

    //将图片上传到云存储空间
    cloudFile(filename,path){
      const {chooseImgs,textVal}=this.data;
      wx.showLoading({
        title: '上传中...',
      })
      wx.cloud.uploadFile({
        //指定上传到的云路径(用当前时间戳)
        cloudPath: filename+".png",
        //上传文件路径,path可作为img标签的src属性显示图片
        filePath:path,
      }).then(res=>{
        urlArr.push(res.fileID)
        this.setData({
          urlArr:urlArr
        });
        //将数据传入数据库
        wx.cloud.callFunction({
          name:"post_1",
          data:{
            text:textVal,
            imgs:urlArr
          },
        });
        wx.hideLoading();
        //提示用户上传成功
        wx.showToast({
          title: '上传成功',
          icon:'none',
          mask:true
        });
      })
  }
})
