const express = require('express');
const router = express.Router();
const { MongoClient, url } = require('../database/mongodb2');
const verifyToken = require('../utils/middleware')


router.put('/update',verifyToken,(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
            res.json({
                message:"Could not connect to MongoDb"
            })
        }
        const dbo = db.db(process.env.DB2)
        const myQuery = { desc:req.body.desc }
        const newValues = { $set:{ title:req.body.title } }
        dbo.collection(process.env.DB_Colllection2).updateOne(myQuery,newValues,(err,final)=>{
            if(err){
                res.json({
                    message:"Could not update the values"
                })
            }
            res.json({
                message:"Updated one value"
            })
            db.close()
        })
    })
})

module.exports = router


