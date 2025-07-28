const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect("mongodb+srv://ck9599804906:5MmVfQFPaAVoByph@cluster0.2whorou.mongodb.net/cohort").then(()=>{
        console.log("Connected to DB")
    })
}

module.exports = connectToDB

