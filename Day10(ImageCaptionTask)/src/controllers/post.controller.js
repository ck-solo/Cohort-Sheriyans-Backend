const postModel = require("../models/post.models");
const generateCaption = require("../services/ai.service");
const uploadImage = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;
    const base64Image = new Buffer.from(file.buffer).toString("base64");

    // const caption = await generateCaption(base64Image);
    // const result = await uploadImage(file.buffer, `${uuidv4()}`);

    const [ caption,result ] = await Promise.all([generateCaption(base64Image), 
      uploadImage(file.buffer, `${uuidv4()}`)
    ]);

    const post = await postModel.create({
       caption: caption,
       image: result.url,
       user: req.user._id 
    });

    res.status(201).json({
      message: "Post created successfully",
      post: post
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || err.toString() });
  }
}

module.exports = { createPostController };
