const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        password: true
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User