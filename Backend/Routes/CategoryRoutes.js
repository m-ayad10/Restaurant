const express = require("express");
const { CategoryValidation } = require("../MiddleWare/CategoryValidation");
const { CategoryUpload, FetchCategory, deleteCategory } = require("../Controller/CategoryController");
const router = express.Router();
const fileUpload = require("express-fileupload");

const fileUploadOption = {
  useTempFiles: true, // Ensure temporary files are used
  tempFileDir: "/tmp/",
};

// Upload a new category with validation and file upload
router.post("/", fileUpload(fileUploadOption), CategoryValidation, CategoryUpload)

// Fetch all categories
router.get('/', FetchCategory)

// Delete a category by ID
router.delete('/:categoryId', deleteCategory)

module.exports = router;
