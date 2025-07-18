const { addToCart, fetchCart, UpdateCart, deleteCart, CartAddCount, CartDecreaseCount } = require('../Controller/CartController')
const router = require('express').Router()
const fileUpload = require("express-fileupload");


const fileUploadOption = {
  useTempFiles: true, // Ensure temporary files are used
  tempFileDir: "/tmp/",
};
// Add item to cart
router.post('/',fileUpload(fileUploadOption), addToCart)

// Fetch user's cart
router.get('/:userId', fetchCart)

// Increase item count in cart
router.patch('/addCount', CartAddCount)

// Decrease item count in cart
router.patch('/decreaseCount', CartDecreaseCount)

// Delete user's cart
router.delete('/', deleteCart)

module.exports = router