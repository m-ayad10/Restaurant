const { AdminLogin, AdminSignup, AdminVerifyToken, AdminSignOut } = require('../Controller/AdminControler')
const { AdminLoginValidation, AdminSignupValidation } = require('../MiddleWare/AdminValidation')

const router = require('express').Router()

// Admin login route with validation middleware
router.post('/login', AdminLoginValidation, AdminLogin)

// Admin signup route with validation middleware
router.post('/signup', AdminSignupValidation, AdminSignup)

// Route to verify admin token
router.get('/verify-token', AdminVerifyToken)

// Admin logout route
router.post('/logout', AdminSignOut)

module.exports = router