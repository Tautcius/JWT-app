const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    password: String,
    admin: Boolean
})


const User = mongoose.model('user', userSchema)
module.exports = User
module.exports.hashPassword = async (password) => {
    try{
        let salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch(error) {
        throw new Error('Hashing failed', error)
    }
}