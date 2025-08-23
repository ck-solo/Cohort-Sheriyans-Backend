const express = require('express')
// const userModel = require('../models/models')

const routes = express.Router()
 
routes.get('/',(req,res)=>{
    
    const{username,password} = req.body

})

module.exports = routes

