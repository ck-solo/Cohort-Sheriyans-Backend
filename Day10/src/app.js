const express = require('express')
const app  = express()
const connectToDB = require('./db/db') 
const router = require('./routes/auth.route')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json())

connectToDB()
app.use('/auth',router)


module.exports = app