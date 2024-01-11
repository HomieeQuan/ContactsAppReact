const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req,res,next) => {
    const authHeader = req.headers.authorization
    if(authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) {
                res.status(401)
                throw new Error('User is unauthorized')
            }
            req.user = decoded.user
            next()
        })
        if(!token) {
            res.status(401)
            throw new Error('User is not authorized or token is missing')
        }
    }
})
module.exports = validateToken