const express = require('express')
const router = express.Router()
const User = require('../models/user')
const usersControler = require('../controllers/usersController')

router.route('/')
.get(
    (req, res) => {
        res.json({ message: 'you are at /api'})
    }
)

router.route('/signup')
.post(usersControler.newUser)

router.route('/login')
.post(usersControler.login)

router.route('/home')
.get(usersControler.index)

router.route('/protected')
.get(usersControler.protected)

module.exports = router