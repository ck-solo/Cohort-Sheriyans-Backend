const mongoose = require('mongoose')

function connectDB(){
     mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
        console.log("Connect to MongooseDB")
     })
     .catch(err=>{
        console.log(err)
     })
}

module.exports = connectDB