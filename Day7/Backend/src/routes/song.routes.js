const express = require('express')
const multer = require('multer');
const uploadFile = require('../service/storage.service');


const  upload = multer({storage:multer.memoryStorage()})

const router = express.Router();
 
router.post('/songs',upload.single("audio"), async (req,res)=>{
    console.log(req.body);
    console.log(req.file)

    const fileData = await uploadFile(req.file)
    console.log(fileData)
    res.status(201).json({
        message:'Song created Successfully',
        song:req.body
    })
})



module.exports = router;