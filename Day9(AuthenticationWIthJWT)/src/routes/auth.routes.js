const express = require("express");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken')

const routes = express.Router();

/* create register api */
routes.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username
  })

  if(user){
    return res.status(409).json({
      message:"user already in use"
    })
  }

  const newuser = await userModel.create({username,password})
   
  const token = jwt.sign({id: newuser._id},process.env.SECRET_URL)

  res.cookie('token',token)

  res.status(201).json({
    message: "User Registered successfully",
    newuser,
  })

  });

/* create user api */
  routes.get('/user', async (req,res)=>{

    const token = req.cookies.tokens
    if(!token){
      res.status(401).json({
        message:"Unauthorized token found"
      })
    }

    try{
      const decode = jwt.verify(token ,process.env.SECRET_URL)
      const user = await userModel.findOne({
        _id: decode.id
      })

      return res.status(201).json({
        message:"user data fetched successfully",
        user
      })
    }catch(err){
        res.status(401).json({
          message:"Unauthorized invalid token"
        })
    }
    
  })

/* Login api */
routes.post('/login',async(req,res)=>{
  const{username,password} = req.body

  const user = await userModel.findOne({username})

  if(!user){
    return res.status(401).json({
      message:"User not found"
    })
  }

  const ispass = user.password == password

  if(!ispass){
    return res.status(401).json({
      message:"Invalid Password"
    })
  }

  const token = jwt.sign({id:user._id},process.env.SECRET_URL)

  res.cookie('token',token),{
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //7days
  }
  res.status(201).json({
    message:"user logged in successfully",
    user
  })

})

/* Logout api */

routes.get('/logout',async(req,res)=>{
  res.clearCookie('token')

  res.status(200).json({
    message:"user logout successfully"
  })
})


module.exports = routes;
