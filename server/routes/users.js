const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.route('/')
.get(async (req, res, next) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch(err){
        next(err)
    }

})
.post(async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        const user = await newUser.save()
        res.status(201).json(user)
    } catch(err) {
        next(err)
    }
})

module.exports = router