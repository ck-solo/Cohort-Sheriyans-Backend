const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
})

const userModel = mongoose.model("user",userScheme)

module.exports = userModel