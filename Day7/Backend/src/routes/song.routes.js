const express = require('express')
const multer = require('multer')


const  upload = multer({storage:multer.memoryStorage()})

const router = express.Router();
 
router.post('/songs',upload.single("audio"),(req,res)=>{
    console.log(req.body);
    console.log(req.file)
    res.status(201).json({
        message:'Song created Successfully',
        song:req.body
    })
})



module.exports = router;