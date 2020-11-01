/*用+号触发tap点击事件，调用小程序内置的选择图片的api，获取图片路径，将图片路径全部存入data变量中，页面可以根据图片数组进行循环显示
点击x号删除图片，首先获取被点击图片的索引，然后获取appdata中的图片数组，删除索引中对应的元素，把数组重新设置回data中
点击√号获取文本内容，对这些内容进行合法性验证，验证通过用户选择的图片，上传到专门的图片的服务器，返回图片外网的链接，然后一起提交到服务器，之后清空当前页面，返回到上一页*/
Page({
  data:{
    //被选中的图片路径数组
    chooseImgs:[],
    textVal:""
  },
  
  //点击+号选择图片
  handleChooseImg(){
    const that=this;
    wx.cloud.init({}),
    //调用小程序内置的选择图片api
   wx.chooseImage({
     //同时可选择图片的上限
     count: 9,
     //可选择图片的格式【原图 压缩】
     sizeType: ['original','compressed'],
     //图片来源【相册 相机】
     sourceType: ['album','camera'],
     success: (result) => {
      that.setData({
        // const filepath=res.tempFilePaths;
        // // 将旧数组链接到新数组上
        // for(var i=that.data.chooseImage.length;i<;)
        chooseImgs:[...that.data.chooseImgs,...result.tempFilePaths]
         
     })
      }
    })
  },


  //点击x号删除图片,e表示有传入的变量
  handleRemoveImg(e){
    //获取被点击图片索引
    const{index}=e.currentTarget.dataset;
    //获取appdata中的图片
    let {chooseImgs}=this.data;
    //删除元素
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs:chooseImgs
    })
  },

  //文本域的输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },

  //点击提交按钮
  handleFormSubmit:function(e){
    var chooseImgs = JSON.stringify(chooseImgs);
    var textVal = JSON.stringify(e.currentTarget.dataset.textVal);
    wx.navigateTo({
      url: '../plus/plus?urlArr=' + chooseImgs,
      url: '../plus/plus?textVal=' + textVal,
    })
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - 2]; //前一页
    wx.navigateBack({
      success: function () {
      beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
