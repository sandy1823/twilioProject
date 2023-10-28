const express = require('express')
const { sendOTP, verifyOTP } = require('./mobileNumService')
const route = express.Router()

// route.

route.post('/SendOtp',sendOTP)
route.post('/verfiyOtp',verifyOTP)
module.exports = route