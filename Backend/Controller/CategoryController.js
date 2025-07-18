const CategoryModel = require("../Models/CategoryScheema");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});

const CategoryUpload = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(500).json({ message: "Bad Request", status: false });
    }
    const { name } = req.body;
    const fileImage = req.files.image.tempFilePath;
    
    const result = await cloudinary.uploader.upload(fileImage, {
      folder: "Category",
    });
    const newCategory = new CategoryModel({ name, image: result.secure_url });
    await newCategory.save();
    res.status(201).json({
      message: "Category uploaded successfully",
      status: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error });
  }
};

const FetchCategory=async(req,res)=>
{
  try {
    const data=await CategoryModel.find()
    if (data.length === 0) {
      return res.status(404).json({ message: "No categories found", status: false });
    }
    res.status(200).json({message:"Data fetched ",status:true,data})
  } catch (error) {
    res.status(404).json({message:'Internal server error ',status:false})
  }

}

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const data = await CategoryModel.findByIdAndDelete(categoryId);
    if (!data) {
      return res.json({ message: "No category Found", status: false });
    }
    const updatedItems=await CategoryModel.find()
    res.json({ message: "Category Deleted", status: true, data:updatedItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error });
  }
};

  

module.exports = { CategoryUpload ,FetchCategory,deleteCategory};
