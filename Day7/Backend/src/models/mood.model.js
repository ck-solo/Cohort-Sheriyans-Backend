const mongoose = require('mongoose')

const moodScheme = new mongoose.Schema ({
    title:String,
    artist:String,
    url:String
})


const moodModel = mongoose.model("mood", moodScheme)

module.exports = moodModel