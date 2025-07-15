const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const { ItemValidation } = require('../MiddleWare/ItemValidation')
const { ItemUpload, ItemFetch, ItemsFetch, FetchItem, FetchAllItems, UpdateItem, postReview, getReviewByUser, deleteItem } = require('../Controller/ItemController')

const fileUploadOption = {
    useTempFiles: true, // Ensure temporary files are used
    tempFileDir: "/tmp/",
}

// Upload a new item with validation
router.post('/item', ItemValidation, ItemUpload)

// Fetch all items
router.get('/items', FetchAllItems)

// Delete an item by ID
router.delete('/item/:itemId', deleteItem)

// Fetch items by category
router.get('/items/:category', ItemsFetch)

// Fetch a single item by ID
router.get('/item/:id', FetchItem)

// Update an item by ID
router.patch('/item/:itemId', UpdateItem)

// Post a review for an item
router.patch('/review/:itemId', postReview)

// Get a review by user for an item
router.get('/review/:itemId/:userId', getReviewByUser)

module.exports = router
