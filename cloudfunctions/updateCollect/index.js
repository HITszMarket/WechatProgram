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
  console.log("获取到的userInfoId", event.userInfoId)
  console.log("itemId:", event.itemId)
  try{
    if( event.isCollected )
    {
      const updateitem_res = await db.collection(event.DBType).doc(event.itemId).update({
        data:{
          collected: db.command.pullAll([event.openId])
        }
      })
      switch(event.DBType){
        case "Merchandise":{
          const updateUser_res = await db.collection("UserInfo").doc(event.userInfoId).update({
            data:{
              collectMerchandise: db.command.pullAll([event.itemId])
            }
          })
          break;
        }
        case "Help":{
          const updateUser_res = await db.collection("UserInfo").doc(event.userInfoId).update({
            data:{
              collectHelp: db.command.pullAll([event.itemId])
            }
          })
          break;
        }
        case "teamUp":{
          const updateUser_res = await db.collection("UserInfo").doc(event.userInfoId).update({
            data:{
              collectTeamUp: db.command.pullAll([event.itemId])
            }
          })
          break;
        }
      }
      return {updateitem_res, updateUser_res}
    }
    else
    {
      const updateitem_res =  await db.collection("Merchandise").doc(event.itemId).update({
        data:{
          collected: db.command.push([event.openId])
        }
      })
      switch(event.DBType){
        case "Merchandise":{
          const updateUser_res = await db.collection("UserInfo").doc(event.userInfoId).update({
            data:{
              collectMerchandise: db.command.push([event.itemId])
            }
          })
          break;
        }
        case "Help":{
          const updateUser_res = await db.collection("UserInfo").doc(event.userInfoId).update({
            data:{
              collectHelp: db.command.push([event.itemId])
            }
          })
          break;
        }
        case "teamUp":{
          const updateUser_res = await db.collection("UserInfo").doc(event.userInfoId).update({
            data:{
              collectTeamUp: db.command.push([event.itemId])
            }
          })
          break;
        }
      }
      return {updateitem_res, updateUser_res}
    }
  }catch(e){
    console.error(e)
  }
}
  
