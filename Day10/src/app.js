const express = require('express');
const connected = require('./db/db')
const routes = require('./routes/routes')
const app = express()
app.use(express.json())


connected()
app.use('/',routes)

module.exports = app