const express = require("express");
const routes = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const {createPostController} = require('../controllers/post.controller')
const multer = require('multer')

const upload = multer({storage: multer.memoryStorage() })

routes.post("/", authMiddleware,
    upload.single('image'),
    createPostController
)

module.exports = routes;
