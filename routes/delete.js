const express = require("express");
const router = express.Router();
const { MongoClient, url } = require('../database/mongodb2')
const verifyToken = require('../utils/middleware')

router.delete('/delete',verifyToken,(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
            res.json({
                message:"Could not connect to MongoDb!"
            })
        }
        var dbo = db.db(process.env.DB2)
        const myQuery = {desc:req.body.desc}
        dbo.collection(process.env.DB_Colllection2).deleteOne(myQuery,(err,final)=>{
            if(err){
                res.json({
                    message:"Not able to delete the data"
                })
            }
            res.json({
                message:"One Data deleted from the MongoDb"
            })
            db.close();
        })
    })
})

module.exports = router


