const mongoose=require('mongoose')

const CategorySchema=new mongoose.Schema({
    name:{
        required:true,
        type:String,
        unique:true
    },
    image:{
        required:true,
        type:String
    }
})

const CategoryModel=mongoose.model('category',CategorySchema)

module.exports=CategoryModel