const util = require('../../utils/util.js')
var app = getApp()
//选择器

// 选项卡类
  Page({
    data:{
      winWidth: 0,
      winHeight: 0,
      // tab切换
      currentTab: 0,
    },
    onLoad: function() {
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
    }
  
  })

// 图片类
  // Component({
  // /**
  //  * 组件的属性列表
  //  */
  // properties: {
  
  // },

  // /**
  //  * 组件的初始数据
  //  */
  // data: {
  //   count:0,
  //   imgUrl:""
  // },

  // /**
  //  * 组件的方法列表
  //  */
  // methods: {
  //   doUpload:function(){
  //     var that=this;
  //     wx.chooseImage({
  //       count: 1,
  //       sizeType: ['compressed'],
  //       sourceType: ['album', 'camera'],
  //       success: function(res) {
  //         console.log(res);
  //         const filePath=res.tempFilePaths[0];
  //         that.setData({
  //           imgUrl: filePath      //在wxml中显示图片的路径 ，要保存下来传入数据库（传入page）
  //         })
  //         //上传图片：这里我是要把文件上传到云存储管理的“images-roomType/此用户的open_id/”的文件夹下
  //         var cloudPath="images-roomType/"+app.globalData.openId+"/"+that.data.count + filePath.match(/\.[^.]+?$/)[0];  //count+".后缀", 如“0.png”
  //         console.log(cloudPath);
  //         wx.cloud.uploadFile({
  //           cloudPath:cloudPath,
  //           filePath:filePath,
  //           success:res=>{
  //             console.log("上传成功");
  //             console.log(res)
  //           }
  //         })
  //       },
  //     })
  //   }
  // }
  // })
