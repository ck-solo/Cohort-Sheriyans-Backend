const mongoose = require('mongoose')

const noteScheme = new mongoose.Schema({
    title:String,
    content:String
})
/* scheme => tell about how the structure will
 model => helps to perform crud operator

*/
const noteModel = mongoose.model("notes",noteScheme)

module.exports = noteModel