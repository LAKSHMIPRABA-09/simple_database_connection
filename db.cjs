const {MongoClient} =require('mongodb')
let db
function connectToDB(startServer)
{
   MongoClient.connect('mongodb+srv://lakshmi:090@cluster0.1bnaufm.mongodb.net/Expense_Tracker').then(function(client){
    db = client.db()
    startServer()
    //console.log(db)
   }).catch(function(error){
    startServer(error)
   })
}
function getDB()
{
    return db
}
module.exports={connectToDB,getDB}