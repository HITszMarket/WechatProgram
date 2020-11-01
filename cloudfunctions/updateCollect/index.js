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
<<<<<<< HEAD
  console.log("获取到的userInfoId", event.userInfoId)
  console.log("itemId:", event.itemId)
  console.log("DBType:", event.DBType)
  try{
    if( event.isCollected )
    {
      // 更新item数据库
=======
<<<<<<< HEAD
  console.log("获取到的userId", event.userId)
=======
>>>>>>> LiYikai
  console.log("获取到的userInfoId", event.userInfoId)
  console.log("itemId:", event.itemId)
  try{
    if( event.isCollected )
    {
>>>>>>> master
      const updateitem_res = await db.collection(event.DBType).doc(event.itemId).update({
        data:{
          collected: db.command.pullAll([event.openId])
        }
      })
<<<<<<< HEAD
      // 更新个人信息数据库
=======
>>>>>>> master
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
<<<<<<< HEAD
      // 更新商品数据库
      const updateitem_res =  await db.collection(event.DBType).doc(event.itemId).update({
=======
      const updateitem_res =  await db.collection("Merchandise").doc(event.itemId).update({
>>>>>>> master
        data:{
          collected: db.command.push([event.openId])
        }
      })
<<<<<<< HEAD
      // 更新个人信息数据库
=======
>>>>>>> master
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
<<<<<<< HEAD
        case "TeamUp":{
=======
        case "teamUp":{
>>>>>>> master
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
<<<<<<< HEAD
=======
  
>>>>>>> master
