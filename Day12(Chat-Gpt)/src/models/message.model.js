const mongoose = require('mongoose')


const messageScheme = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat"
    },
    content:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum: [ "user", "model", "system"],
        default:"user"
    }
},{
    timestamps:true
})

const messageModel = mongoose.model("message", messageScheme)

module.exports = messageModel