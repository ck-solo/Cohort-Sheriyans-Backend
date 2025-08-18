const mongoose = require('mongoose')

const moodScheme = new mongoose.Schema ({
    title:String,
    artist:String,
    audio:String,
    mood:String
})


const moodModel = mongoose.model("mood", moodScheme)

module.exports = moodModel