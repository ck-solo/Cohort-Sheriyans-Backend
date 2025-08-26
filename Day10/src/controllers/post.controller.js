const postModel = require('../models/post.models')

async function createPostController(req,res){
    const file = req.file
    console.log("Files received", file)
}

module.exports = {createPostController}
