const mongoose = require('mongoose')

const postScheme = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

const postModel = mongoose.model('post',postScheme)

module.exports = postModel;