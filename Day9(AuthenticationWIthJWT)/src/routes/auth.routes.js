const express = require("express");
const userModel = require("../models/user.model");

const routes = express.Router();

routes.post("/register", async (req, res) => {
  const { username, password } = req.body;


  /* create new user */
//   const newuser = await userModel.create({
//     username,password
//   })
//   res.status(201).json({
//     message: "User LoggedIn successfully",
//     newuser,
//   });


/* Login route */

  const user = await userModel.findOne({
    username 
 });

  if(!user){
    return res.status(401).json({
        message:"User not exist"
    })
  }

  const ispass = password == user.password

  if(!ispass){
    return res.status(401).json({
        message:"Invalid password"
    })
  }

  res.status(201).json({
    message: "User LoggedIn successfully",
    user,
  });
});

module.exports = routes;
