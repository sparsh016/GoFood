const express=require('express');
const mongoose = require("mongoose");
const router=express.Router();
const mongoDB= require('../db');
const User=require('../newModel/User');
const { body, validationResult } = require('express-validator');
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="MynameisEndtoEndYoutubeChannel$#";
//Code to create a user id, To save data
   router.post('/creatuser'             
,[
    body('email').isEmail(),
    body('password').isLength({min:5}),
    body('name').isLength({min:5})
]
,async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let alreadyExist= await User.findOne({email:req.body.email});
    if(alreadyExist){
        return res.json({success:false,exists:1});
    }
    //How to encrypt password using bcrypt:
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    }
    catch(error){
        console.log(error);
        res.json({success:false});
    }
})

//Code for login page: 
router.post('/loginuser',[
    body('email').isEmail(),
    body('password').isLength({min:5})
]           
,async (req,res)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg:"Enter credentials as per defined format",errors: errors.array()});
    }
        let email=req.body.email;
        try{
            let userData=await User.findOne({email: email});
            if(!userData){
                return res.status(400).json({msg: "Incorrect email"});
            }
            const pwdCompare= await bcrypt.compare(req.body.password,userData.password);
            if(!pwdCompare){
                return res.status(400).json({msg: "Incorrect password"});
            }
            //generating authToken: 
            const data={          
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret);  //set an authToken
            return res.json({success:true,authToken:authToken,userData:userData});   //get an authToken
        }
        
    catch(error){
        console.log(error);
        res.json({success: false,msg: "Error in logging in "});
    }
}
)

//Code to add new food item
router.post('/addnewfood'             
    ,[
        body('foodCategory').isLength({min:3}),
        body('foodName').isLength({min:3}),
        body('imgSrc').isURL(),
    ]
    ,async (req,res)=>{
        console.log("control is in addnewfood");
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg:"Enter credentials as per defined format",errors: errors.array()});
        }
        try{
            const db = await mongoDB();
            let nFoodCategory=req.body.foodCategory.toLowerCase();
            const food_items = db.collection('food_items');
            const food_category = db.collection("food_category");
            const categoryExists = await food_category.findOne({ CategoryName: nFoodCategory });
            if (!categoryExists) {
                await food_category.insertOne({ CategoryName: nFoodCategory });
            }
            await food_items.insertOne({
                CategoryName:nFoodCategory,
                name:req.body.foodName,
                img:req.body.imgSrc,
                options:req.body.sizeOptions,
                description:req.body.foodDescription,
                email:req.body.email,
            })
            res.json({msg:"Data Successfully added",success:true});
        }
        catch(error){
            console.log(error);
            res.json({msg:"Some error occured in uploading data",success:false});
        }
    })

    //Code to delete food item
router.post('/deleteitem'             
    ,[
        body('foodCategory').isLength({min:3}),
        body('foodName').isLength({min:3}),
    ]
    ,async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg:"Enter credentials as per defined format",errors: errors.array()});
        }
        try{
            const db = await mongoDB();
            const food_items = db.collection('food_items');
            const { foodCategory, foodName, email } = req.body;
            console.log("Delete Criteria:", { foodCategory, foodName, email });
            const result = await food_items.deleteMany({ CategoryName: foodCategory, name: foodName, email:email});
            if (result.deletedCount===0) {
                return res.json({msg:"You can't delete this item",success:true});
            }
            res.json({msg:"Data Successfully Deleted",success:true});
        }
        catch(error){
            console.log(error);
            res.json({msg:"Some error occured in uploading data",success:false});
        }
    })

module.exports=router;