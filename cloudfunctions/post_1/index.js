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
  var comments=event.comments;
  var type=event.type;
  var time=event.time;
  var price=event.price;
  var condition=event.condition;
  var choose=event.choose;
  var writerName=event.writerName;
  var writerAvatar=event.writerAvatar;
  var value=event.value;
  switch(database){
    case "Merchandise":{
      return await db.collection("Merchandise").add({
        data:{
        description:text,
        imageUrl:imgs,
        time:db.serverDate(),
        OPENID:OPENID,
        APPID:APPID,
        collected:collected,
        comments:comments,
        classification:type,//类型
        date:time,//截止时间
        price:price,//价格
        condition:condition,//状态
        writerName:writerName,
        writerAvatar:writerAvatar,
        },
        success(res)
        {
          console.log("success", res)
        },
        fail(res){
          console.log("fail", res)
        }
      })
      break;
    }

    case "TeamUp":
      return await db.collection("TeamUp").add({
        data:{
          description:text,
          imageUrl:imgs,
          time:time,
          createtime:db.serverDate(),
          OPENID:OPENID,
          APPID:APPID,
          classification:value,//单选器_组队类型
          collected:collected,
          comments:comments,
          writerName:writerName,
          writerAvatar:writerAvatar,
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
          description:text,
          imageUrl:imgs,
          time:time,
          createtime:db.serverDate(),
          OPENID:OPENID,
          APPID:APPID,
          classification:value,//单选器_组队类型
          collected:collected,
          comments:comments,
          writerName:writerName,
          writerAvatar:writerAvatar,
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