//app.js
var QQMapWX = require('utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

App({
 globalData: {
    envID:'market-nat7h',
    userInfo: null,
    userInfoId:'',
    openId:'',
  },
  data: {
    province: '',
    city: '',
    latitude: '',
    longitude: ''
  },
  onLaunch: function () {
    if (!wx.cloud)
      console.error("云服务器错误");
    wx.cloud.init({
      //环境ID
      nv: 'market-nat7h',
      traceUser: true
    })
    qqmapsdk = new QQMapWX({
      key: 'GJABZ-OENWU-IHHVB-2IZAF-QRX7H-EVB6G' //自己的key秘钥
    });
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        vm.getOpenId()
        // vm.updateUserDB()
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            lang: "zh_CN",
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("用户信息")
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        //云服务器初始化
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
    if(this.getUserInfoCallBack){
      this.getUserInfoCallBack(vm.globalData)
    }
  },

  //获取用户openID
  getOpenId: function() {
    let that = this;
    console.log("进入getOpenId()")
    wx.cloud.callFunction({
     name: 'getOpenId',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openId)
      var openid = res.result.openId;
      that.globalData.openId=openid
     }
    })
  },
  // 更新用户的数据到数据库
  updateUserDB: function(){
    // 确定已经获取到openId
    if( this.globalData.openId == '')
    {
      console.log("还没获取openId，上传到数据库失败")
    }
    // 检查用户数据是否存在数据库
    // 如果有就获取userId
    // 如果没有就将用户数据上传到数据库
    const db = wx.cloud.database
    const userInfoDB = db.collection("UserInfo")
    userInfoDB.where({
      openId: db.command.eq(this.data.userOpenId)
    }).get({
      complete(res){
        // 之前没有用户数据存储在数据库
        if(res.data.length == 0)
        {
          userInfoDB.add({
            data: {
              openId: app.globalData.openId,
              name: app.globalData.nickName,
              avatarUrl: that.data.userInfo.avatarUrl,
              collectMerchandise: [],
              collectHelp: [],
              collectTeamUp: []
            },
            success: function(res){
              console.log(res),
              app.globalData.userInfoId = res._id
              console.log("userInfoId:", res._id)
              that.setData({
                userInfoId: res._id,
                hasUserInfoId: true
              })
            },
            fail: function(res){
              console.error("用户信息上传失败")
            }
          })
        }
        // 之前已有数据
        else{
          this.globalData.userInfoId = res._id
        }
      }
    })
  },
  
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置 
  getLocal: function (latitude, longitude) {
    let vm = this; 
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        // console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        console.log(province, city)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
})

