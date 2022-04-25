const mongoose=require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");

const userSchema=mongoose.Schema({
    // _id:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true, default: 'user'}
});

userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userSchema);