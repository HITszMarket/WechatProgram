// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "market-nat7h"
})
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  event.obj.commentTime = new Date()
  try{
    return await db.collection(event.DBType).doc(event.itemId).update({
      data:{
        comments: db.command.push([event.obj])
      }
    })
  }
  catch(e){
    console.error(e)
  } 
}