const { addOrder, fetchUserOrders, fetchAllOrders, updateOrder, RazorpayOrder, verifyPayment } = require('../Controller/OrderController')
const router = require('express').Router()

// Place a new order
router.post('/orders', addOrder)

// Create a Razorpay order for payment
router.post('/create-razorpay-order', RazorpayOrder)

// Verify Razorpay payment signature
router.post('/verify-payment', verifyPayment)

// Fetch orders for a specific user
router.get('/orders/:userId', fetchUserOrders)

// Fetch all orders (admin)
router.get('/allorders', fetchAllOrders)

// Update order status (admin)
router.patch('/allorders', updateOrder)

module.exports = router