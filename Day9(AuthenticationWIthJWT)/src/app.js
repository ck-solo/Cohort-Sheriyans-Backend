const express = require('express')
const cookieParser = require('cookie-parser')
const indexRoutes = require('./routes/auth.routes')

 
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/auth',indexRoutes)


module.exports = app