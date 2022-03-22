var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { MongoClient, url } = require('../database/mongodb');

// router.post('/login',(req, res) =>{
//     MongoClient.connect(url,(err,db)=>{
        
//         if(err){
//             res.json({
//                 message:"Could not Connect to MonogoDb"
//             })
//         } 
//         var dbo = db.db(process.env.DB1);
//         dbo.collection(process.env.DB_Colllection1).find({},{ projection: { _id: 0, email: 1, password: 1 } }).toArray((err,results)=>{
//             let newArray = [];
//             if(err){
//                 res.json({
//                     message:"there is some error"
//                 })
//             }
//             results.forEach(result=>{
//                 newArray.push(result.email)
//                 // console.log(newArray)
//             })
//             newArray.filter(na =>{
//                 if(na === req.body.email){
//                     const access_token = jwt.sign({sub: req.body.email},process.env.JWT_ACCESS_KEY,{expiresIn: process.env.JWT_ACCESS_TIME})
//                     return res.json({           // Always return 
//                         message:"Logged In",
//                         Access_Token :access_token
//                     })
//                 }else{
//                     console.log("Please Register")  // ??
//                 }
//             })
//         })
//     })
// })

router.post('/login', (req, res) =>{
        MongoClient.connect(url,async(err,db)=>{
            
            if(err){
                res.json({
                    message:"Could not Connect to MonogoDb"
                })
            } 
        const dbo = db.db(process.env.DB1);
        const loginData= await dbo.collection(process.env.DB_Colllection1).find({},{ projection: { _id: 0, email: 1, password: 1 } }).toArray()
            let newArray = [];
            if(err){
                res.json({
                    message:"there is some error"
                })
            }
            loginData.forEach(result=>{
                                newArray.push(result.email)
                                // console.log(newArray)
                            })
                            newArray.filter(na =>{
                                if(na === req.body.email){
                                    const access_token = jwt.sign({sub: req.body.email},process.env.JWT_ACCESS_KEY,{expiresIn: process.env.JWT_ACCESS_TIME})
                                    return res.json({           // Always return 
                                        message:"Logged In",
                                        Access_Token :access_token
                                    })
                                }
                                //else{
                                //     //console.log("Please Register")  // ??
                                // }
                            })
                        })
                    })
                



module.exports = router;


