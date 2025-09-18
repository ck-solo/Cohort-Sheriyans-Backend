const userModel = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
async function registerUser(req,res){
   const { FullName = {}, email, password } = req.body;
const { FirstName, LastName } = FullName;

      
    const isUserAvail = await userModel.findOne({email})

    if(isUserAvail){
       return res.status(400).json({
            message:"User Already Exists"
        })
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        FullName:{
            FirstName,LastName
        },
        email,
        password: hashPass
        
    })

    const token = jwtToken.sign({id:user._id}, process.env.JWT_TOKEN)

    res.cookie('token', token)
    res.status(201).json({
        message:"User Registered Successfully.",
        user:{
            email:user.email,
            _id: user._id,
            FullName: user.FullName
        }
    })
}

async function loginUser(req,res){
    const{email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
      return  res.status(400).json({
            message:"User not Found"
        })
    }
    const ispass = await bcrypt.compare(password, user.password)
    if(!ispass){
       return  res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwtToken.sign({id:user._id},process.env.JWT_TOKEN)
    res.cookie("token", token)

    res.status(201).json({
        message:"Login Successfully",
        user:{
            email:user.email,
            id:user._id,
            FullName: user.FullName
        }
    })
}

module.exports = {
    registerUser,
    loginUser
}