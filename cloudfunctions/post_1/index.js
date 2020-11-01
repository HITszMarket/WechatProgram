// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"market-nat7h"
})
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID } = cloud.getWXContext()
  var text=event.text;
  var imgs=event.imgs;
  var database=event.database;//传入哪一个数据库
  var collected=event.collected;
  var type=event.type;
  switch(database){
    case "Merchandise":
      return await db.collection("Merchandise").add({
      data:{
        text:text,
        imgs:imgs,
        createtime:db.serverDate(),
        OPENID:OPENID,
        APPID:APPID,
        collected:collected,
        type:type,
      },
      success(res)
      {
        console.log("success", res)
      },
      fail(res){
        console.log("fail", res)
      }
    });
    
    case "TeamUp":
      return await db.collection("TeamUp").add({
        data:{
          text:text,
          imgs:imgs,
          createtime:db.serverDate(),
        },
        success(res)
        {
          console.log("success", res)
        },
        fail(res){
          console.log("fail", res)
        }
      });

    case "Help":
      return await db.collection("Help").add({
        data:{
          text:text,
          imgs:imgs,
          date:date,

          createtime:db.serverDate(),
        },
        success(res)
        {
          console.log("success", res)
        },
        fail(res){
          console.log("fail", res)
        }
      });
  }

}