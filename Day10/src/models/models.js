const mongoose = require('mongoose')
const noteScheme = new mongoose.Schema({
    username :{
        type: String,
        unique: true,
        required:true

    }
     
})

const noteModel = mongoose.model("notes", noteScheme)

module.exports = noteModel