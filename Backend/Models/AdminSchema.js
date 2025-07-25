const mongoose=require('mongoose')

const AdminSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const AdminModel=mongoose.model('admin',AdminSchema)

module.exports=AdminModel