const mongoose = require('mongoose')

// server database  se kese connect hoga ye db.js file me likhte hai


function connectToDB(){
    mongoose.connect("mongodb+srv://ck9599804906:5MmVfQFPaAVoByph@cluster0.2whorou.mongodb.net/cohort").then(()=>{
        console.log("connect to DB")
    })
}


module.exports = connectToDB