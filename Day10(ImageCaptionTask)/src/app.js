const express = require('express')
const app  = express()
const connectToDB = require('./db/db') 
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.routes')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json())

connectToDB()
app.use('/auth',authRouter)
app.use('/auth/post',postRouter)


module.exports = app