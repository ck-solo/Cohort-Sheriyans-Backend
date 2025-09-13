const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const chatControl = require('../controller/chat.controller')

const router = express.Router()


router.post('/', authMiddleware.authUser, chatControl.createChat)
 

module.exports = router;