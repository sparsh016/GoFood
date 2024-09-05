const express=require('express');
const mongoose = require("mongoose");
const mongoDB= require('../db');
const router=express.Router();
router.post('/foodData',async(req,res)=>{
    try{
      const db = await mongoDB();
      const collection = db.collection("food_items");
      const data = await collection.find({}).toArray();
      const coll=db.collection("food_category");
      const catData=await coll.find({}).toArray();
    //   console.log(catData,data);
        res.send([catData,data])
    }
    catch(error){
        console.error(error.message);
        res.send("Server Error");
    }
})
module.exports=router;