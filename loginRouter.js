const express = require('express')
const { signUpFunc, loginFunc, getAllUser } = require('./loginService')
const route = express.Router()

route.post('/signUp',signUpFunc);
route.post('/login',loginFunc)
route.get('/getAll',getAllUser)


module.exports = route