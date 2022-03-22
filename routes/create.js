const express = require('express')
const router = express.Router()
const { MongoClient,url } = require('../database/mongodb2')
const verifyToken = require('../utils/middleware')

router.post('/create',verifyToken,(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
            res.json({
                message:"Could not connect to MongoDb!"
            })
        }
        var dbo = db.db(process.env.DB2)
        const myObj = {title:req.body.title ,desc:req.body.desc}
        dbo.collection(process.env.DB_Colllection2).insertOne(myObj,(err,final)=>{
            if(err){
                res.json({
                    message:"Not able to insert the data"
                })
            }
            res.json({
                message:"One Data inserted",
                data:final
            })
            db.close();
        })
    })
})

module.exports = router