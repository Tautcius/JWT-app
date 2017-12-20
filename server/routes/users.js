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
//unprotected routes
router.route('/signup')
.post(usersControler.unprotected.signUp)

router.route('/login')
.post(usersControler.unprotected.login)
//protected routes
//router.route('/home')
//.get(usersControler.protected.index)

router.use(usersControler.unprotected.verifyToken)
router.route('/users')
.get(usersControler.protected.users)
router.route('/me')
.get(usersControler.protected.me)
.put(usersControler.protected.update)
.delete(usersControler.protected.delete)

module.exports = router