const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')

const chatRoutes = express.Router()

chatRoutes.post('/', authMiddleware.authUser)


module.exports = chatRoutes