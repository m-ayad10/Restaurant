const { addToCart, fetchCart, UpdateCart, deleteCart, CartAddCount, CartDecreaseCount } = require('../Controller/CartController')
const router = require('express').Router()

// Add item to cart
router.post('/', addToCart)

// Fetch user's cart
router.get('/:userId', fetchCart)

// Increase item count in cart
router.patch('/addCount', CartAddCount)

// Decrease item count in cart
router.patch('/decreaseCount', CartDecreaseCount)

// Delete user's cart
router.delete('/', deleteCart)

module.exports = router