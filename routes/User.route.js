const express=require('express');
const UserModel = require('../model/User.mode');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const user=express.Router();


// login
user.post('/login',async(req,res)=>{
    try {
        const user=await UserModel.findOne({email:req.body.email});
        bcrypt.compare(req.body.password,user.password,async(err,result)=>{
            if(result){
                const token=jwt.sign({id:user._id},'userLogin');
                await UserModel.findByIdAndUpdate({_id:user._id},isLogin=true);
                res.status(200).send({"success":"login successful","token":token});
            }else{
                res.status(401).send({"error":"wrong password"});
            }
        })
    } catch (error) {
        res.status(501).send({"failed":"user does not exist"});
    }
});

// register
user.post('/register',async(req,res)=>{
    try {
        const user=await UserModel.findOne({email:req.body.email});
        if(user){
            res.status(200).send({"error":"user is already registered"});
        }else{
            bcrypt.hash(req.body.password,5,async(err,hash)=>{
            if(hash){
                const user=new UserModel({name:req.body.name,email:req.body.email,password:hash,isLogin:false});
                await user.save();
                res.status(201).send({"Success":"account is created successfully"});
            }else{
                res.status(501).send({"error":"failed to hash the password"});
            }
        })
    }
    } catch (error) {
        res.status(501).send({"error":"failed to create the user"});
    }
});

// logOut
user.post('/logout',async(req,res)=>{
    try {
        await UserModel.findByIdAndUpdate({_id:req.body.id},isLogin=false);
        res.status(200).send({"success":"logout successful"});
    } catch (error) {
        res.status(501).send({"failed":"failed to logout"});
    }
})

// login usersList
user.get('/getProfile',async(req,res)=>{
    try {
        const response=await UserModel.aggregate([{$match:{isLogin:true}}]);
        res.status(200).send(response);
    } catch (error) {
        res.status(501).send({"error":"failed to fetch the data"});
    }
})


module.exports=user;