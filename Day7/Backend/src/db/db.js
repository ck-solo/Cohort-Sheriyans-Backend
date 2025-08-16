const mongoose = require("mongoose")


function connectToDB(){
    mongoose.connect(process.env.MODEL_URL).then(()=>{
        console.log("Connect to DB")
    })
    .catch((err)=>{
        console.log("Error to something to MongoDB:",err)

    })
}

module.exports = connectToDB