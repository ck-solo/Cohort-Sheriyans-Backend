const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("Connect to MONGODB")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectToDB