const express = require("express");
const routes = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
routes.post("/", authMiddleware, creatPostController)

module.exports = router;
