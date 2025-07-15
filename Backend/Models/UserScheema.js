const mongoose=require('mongoose')

const UserScheema=new mongoose.Schema({
    email:
    {
        required:true,
        unique:true,
        type:String
    },
    fullName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:
    {
        required:true,
        type:String
    }
})

const UserModel=mongoose.model('users',UserScheema)
module.exports=UserModel