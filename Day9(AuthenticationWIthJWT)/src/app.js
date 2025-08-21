const express = require('express')
const indesRoutes = require('./routes/auth.routes')
 
const app = express()
app.use(express.json())

app.use('/auth',indesRoutes)


module.exports = app