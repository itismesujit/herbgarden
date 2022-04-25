const bcrypt=require('bcrypt');
const express = require('express');
const jwt=require("jsonwebtoken");
const router=express.Router();
const User=require('../models/user');

// exports.signin=
router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then(hash =>{
        const user =new User({
            email:req.body.email,
            password:hash
        });
        user.save()
            .then(result =>{
                res.status(201).json({
                    message:"User created!",
                    result:result
                });
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                });
            })
    })
})//signup ends

exports.login=
router.post("/login",(req,res,next)=>{
    let fetcheduser;
    User.findOne({email:req.body.email})
    .then(user =>{
        if(!user){
            return res.status(401).json({
                message:"Authentication Failed: User not found"
            })
        }
        //if user is found store it
        fetcheduser=user;
        return bcrypt.compare(req.body.password,user.password)
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                message:"Authentication Failed: Password did not match"
            })
        }//end of password does not match
        //if password matches create jwt and attach to the response
        const token=jwt.sign(
            {email:fetcheduser.email, userId:fetcheduser._id,role:fetcheduser.role },
            "secret_this_should_be_longer",
            {expiresIn:"1h"}
        );
        return res.status(200).json({
            token:token,
            expiresIn:3600
        })
    }) //end of then for resolve
    .catch(err=>{
        return res.status(401).json({
            message:"Authentication Failed"
        })
    });
})

module.exports=router