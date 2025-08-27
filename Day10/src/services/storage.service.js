const Imagekit = require('imagekit') 

const imagekit = new Imagekit({
    publicKey: process.env.ImageKit_Public_Key,
    privateKey: process.env.ImageKit_Private_Key,
    urlEndpoint: process.env.ImageKit_Url_Endpoint
})

 async function uploadImage(file,filename) {
    const response = await imagekit.upload({
        file:file,
        fileName:filename,
        folder:"Cohort-ai-Image-caption"
    })
    return response
 }

 module.exports = uploadImage