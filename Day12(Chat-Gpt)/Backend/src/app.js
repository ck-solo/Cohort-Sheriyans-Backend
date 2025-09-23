const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/app.routes')
const chatRouter = require('./routes/chat.routes')
const cors = require('cors')
const app = express()


/*Middleware */
app.use(cors())
app.use(express.json())
app.use(cookieParser())


/*Routes */
app.use('/api/auth/',authRouter)
app.use('/api/chat/',chatRouter)

module.exports = app;