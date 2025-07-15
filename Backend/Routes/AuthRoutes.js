const express = require('express')
const { loginValidation, signupValidation } = require('../MiddleWare/UserValidation')
const { login, signup, verifyToken, signOut, editUser } = require('../Controller/UserController')
const router = express.Router()

// User login route with validation middleware
router.post('/login', loginValidation, login)

// User signup route with validation middleware
router.post('/signup', signupValidation, signup)

// Route to verify user token
router.get('/verify-token', verifyToken)

// User logout route
router.post('/logout', signOut)

// Edit user profile route
router.patch('/user/:id', editUser)

module.exports = router
