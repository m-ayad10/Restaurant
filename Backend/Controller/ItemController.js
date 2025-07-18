const { default: mongoose } = require("mongoose");
const ItemModel = require("../Models/ItemScheema");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});

const ItemUpload = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    if (!req.files) {
      return res.status(500).json({ message: "Bad Request", status: false });
    }
    const imageFile = req.files.image.tempFilePath;
    const result = await cloudinary.uploader.upload(imageFile, {
      folder: "Items",
    });

    const newItem = new ItemModel({
      name: name,
      category,
      price,
      description,
      image: result.secure_url,
    });
    await newItem.save();

    res.status(200).json({
      message: "Item Uploaded Successfully",
      status: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal server error", status: false, error });
  }
};

const FetchAllItems = async (req, res) => {
  try {
    const data = await ItemModel.find();
    if (data.length === 0) {
      return res.json({ message: "No Item Found", status: false });
    }
    res.status(200).json({ data, status: true, message: "Items fetched" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal server error", status: false, error });
  }
};

const ItemsFetch = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await ItemModel.find({ category });
    if (data.length === 0) {
      return res.json({ message: "No Item Found", status: false });
    }
    res.status(200).json({ message: "Item found", data, status: true });
  } catch (error) {
    res.status(404).json({ message: "Internal server error", status: false });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const data = await ItemModel.findByIdAndDelete(itemId);
    if (!data) {
      return res.json({ message: "No Item Found", status: false });
    }
    const updatedItems=await ItemModel.find()
    res.json({ message: "Item Deleted", status: true, data:updatedItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error });
  }
};

const UpdateItem = async (req, res) => {
  try {
    const { itemId } = req.params;          
    const { name, description, category, price } = req.body;

    // 🔥 Find the item by _id (NOT id)
    const data = await ItemModel.findOne({ _id: itemId });

    if (!data) {
      return res.status(404).json({ message: "Item not found" });
    }

    // 🔥 Update fields if provided
    if (!name || !description || !category || !price) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: false });
    }
    data.name = name;
    data.description = description;
    data.category = category;
    data.price = price;

    // 🔥 Handle image update if a new image is provided
    if (req.files && req.files.image) {
      const imageFile = req.files.image.tempFilePath;
      const result = await cloudinary.uploader.upload(imageFile, {
        folder: "Items",
      });
      data.image = result.secure_url; // Save new Cloudinary image URL
    }

    // 🔥 Save the updated item in the database
    await data.save();

    // 🔥 Send success response
    res.status(200).json({
      message: "Item updated successfully",
      data,
      status: true,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const FetchItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ItemModel.findOne({ _id: id });
    if (data.length === 0) {
      return res.json({ message: "No data found", status: false });
    }
    res.status(202).json({ message: "item found", status: true, data });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal server error", error, status: false });
  }
};
const postReview = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { rating, comment, userId, username } = req.body;

    // Find the item in DB
    const data = await ItemModel.findById(itemId);

    if (!data) {
      return res.status(404).json({ message: "Item not found", status: false });
    }

    // Ensure reviews array exists
    if (!Array.isArray(data.reviews)) {
      data.reviews = [];
    }

    let userReviewIndex = -1; // Default index for new reviews

    // **Only check for existing reviews if the array is not empty**
    if (data.reviews.length > 0) {
      userReviewIndex = data.reviews.findIndex(
        (review) => review?.userId?.toString() === userId
      );
    }

    if (userReviewIndex !== -1) {
      // Update existing review
      data.reviews[userReviewIndex].rating = rating;
      data.reviews[userReviewIndex].comment = comment;
    } else {
      // **Force Mongoose to track change**
      data.reviews = [...data.reviews, { rating, comment, userId, username }];
    }

    // **Ensure the change is detected**
    data.markModified("reviews");

    const response = await data.save();

    return res
      .status(200)
      .json({ message: "Review Uploaded", data, status: true });
  } catch (error) {
    console.error("Error posting review:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error, status: false });
  }
};

const getReviewByUser = async (req, res) => {
  try {
    const { itemId, userId } = req.params;

    // Find the item by ID
    const data = await ItemModel.findOne({ _id: itemId });
    if (!data) {
      return res.status(404).json({ message: "Item not found", status: false });
    }

    // Find the user's review
    const userReview = (data.reviews || []).find(
      (review) => review.userId.toString() === userId
    );

    if (userReview) {
      return res
        .status(200)
        .json({ message: "Review found", data: userReview, status: true });
    } else {
      return res
        .status(404)
        .json({ message: "Review not found", status: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error, status: false });
  }
};

module.exports = {
  ItemUpload,
  ItemsFetch,
  FetchItem,
  FetchAllItems,
  UpdateItem,
  postReview,
  getReviewByUser,
  deleteItem
};
