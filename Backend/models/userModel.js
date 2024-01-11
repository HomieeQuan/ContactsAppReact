const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add user name']
    },
    email: {
        type: String,
        required: [true, 'Please add user name'],
        uniqure: [true, 'Email is already taken']
    },
    password: {
        type: String,
        required: [true, 'Please add user password']
    },    
})
module.exports = mongoose.model('User', userSchema)