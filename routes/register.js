var express = require('express');
var router = express.Router();
const {MongoClient , url} = require('../database/mongodb');

/* GET home page. */
// router.post('/register', function(req, res) {
//     MongoClient.connect(url,(err,db)=>{
//         if(err){
//             res.json({
//                 message:"Could not Connect to MonogoDb"
//             })
//         }
//     const dbo = db.db(process.env.DB1)
//         const myObj = { name:req.body.name, email:req.body.email, password:req.body.password }
//         // console.log("this is 1");
//         console.log(myObj)
//         dbo.collection(process.env.DB_Colllection1).insertOne(myObj,(err,result)=>{
//         // console.log("this is 2");
//             if(err){
//                 res.json({
//                     messsage:"Not able to add the data"
//                 })
//             }
//         // console.log("this is 3");

//             res.json({
//                 message:"Registered and added the data to DB"
//             })
//         })
//     })
// });

router.post('/register', function(req, res) {
    MongoClient.connect(url,async (err,db)=>{
        if(err){
            res.json({
                message:"Could not Connect to MonogoDb"
            })
        }
    const dbo = db.db(process.env.DB1)
        const myObj = { name:req.body.name, email:req.body.email, password:req.body.password }
        console.log(myObj)
        const myData = await dbo.collection(process.env.DB_Colllection1).insertOne(myObj)
            res.json({
                message:"Registered and added the data to DB",
                status:myData
            })
        })
    })

module.exports = router;




