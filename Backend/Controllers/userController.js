const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const registerUser = asyncHandler(async (req,res) => {
    const { username, email, password} = req.body
    if(!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const userRegistered = await User.findOne({ email})
    if(userRegistered) {
        res.status(400)
        throw new Error(' User is already registered')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    res.status(201).json(user)
})


const loginUser = asyncHandler(async (req,res) => {
    const {  email, password} = req.body
    if( !email || !password) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const user = await User.findOne({ email })
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            { user },
            process.env.SECRET,
            { expiresIn: '30m'}
        )
        res.status(200).json({accessToken})
    }
    else{res.status(404)
    throw new Error('User not found')
    }
})


const currentUser = asyncHandler(async (req,res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}