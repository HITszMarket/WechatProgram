// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "market-nat7h"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("进入云函数")
  console.log("获取到的userId", event.userId)
  try{
    if( event.isCollected)
    {
      return await db.collection("Merchandise").doc(event.merchandiseId).update({
        data:{
          collected: db.command.pullAll([event.userId])
        }
      })
    }
    else
    {
      return await db.collection("Merchandise").doc(event.merchandiseId).update({
        data:{
          collected: db.command.push([event.userId])
        }
      })
    }
    
  }catch(e){
    console.error(e)
  }
}
  
