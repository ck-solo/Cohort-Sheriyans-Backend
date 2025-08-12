const mongoose = require('mongoose')

function connnetTODB(){
mongoose.connect('mongodb+srv://ck9599804906:16SCS27AN09jEAdG@cluster0.2whorou.mongodb.net/cohort').then(()=>{
    console.log("connected to DB")
})
}

module.exports = connnetTODB