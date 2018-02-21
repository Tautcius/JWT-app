const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')

signToken = user => {
    return jwt.sign(user.toJSON(),
        config.secret, {
            expiresIn: 60 * 60 * 24,
        })
}
exports.unprotected = {
    signUp: () => {},
    login: () => {},
    verifyToken: () => {} 
}

exports.protected = {
    me: () => {},
    update: () => {},
    delete: () => {},
    users: () => {}
}


    exports.unprotected.signUp = async(req, res, next) => {
        try {
            const { name } = req.body
            const foundUser = await User.findOne({
                name
            })
            if (foundUser) {
                return res.status(401).json({
                    error: 'name is in use'
                })
            }
            //hash passowrd
            const hash = await User.hashPassword(req.body.password)
            console.log('hash', hash)
            //save User
            delete req.body.password
            req.body.password = hash

            const newUser = new User(req.body)
            await newUser.save()
            //generate token
            const token = signToken(newUser)
            //respond with token
            res.status(200).json({
                token
            })
        } catch (err) {
            next(err)
        }

    },
    exports.unprotected.login = async (req, res, next) => {
        try {
            console.log(req.body)
            const { name } = req.body

            await User.findOne({name}, (err, user) => {
                if (!user) return res.status(404).send('No user found.')
                    bcrypt.compare(req.body.password, user.password, (err, match) => {
                        if (match) {
                            const token = signToken(user)
                            res.status(200).json({
                                success: true,
                                message: 'You have loged in',
                                token: token
                            })
                        } else {
                            res.status(401).json({
                                success: false,
                                message: 'Authentication failed. Wrong password.'
                            })
                        }
                })
            })
        } catch (err) {
            next(err)
                }
        },
    exports.protected.users = (req, res, next) => {
        User.find({}, (err, users) => {
            if (err) return res.status(500).send("there was a problem finding user.")
            res.json(users)
        })
    },
    exports.unprotected.verifyToken = (req, res, next) => {
        let token = req.body.token || req.query.token || req.headers['x-access-token']
        console.log(token)
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    console.log(err)
                    return res.status(401).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    })
                }
                else {
                    res.decoded = decoded
                    res.token = token
                    next()
                }
                
            })
        }
    },
    exports.protected.me = (req, res, next) => {
        User.findById(res.decoded.user._id, (err, user) => {
            if (err) throw err
            res.json(user)
        })
    },
    exports.protected.update = (req, res, next) => {
        let updateUser = req.body
        User.findByIdAndUpdate(res.decoded.user._id, updateUser, (err, updateUser) => {
            if (err) throw err
            res.status(200).json({ success: true})
        })
    },
    exports.protected.delete = (req, res, next) => {
        User.Remove(res.decoded.user._id, (err, user) => {
            if (err) throw err
            res.status(200).json({message: "User has beed deleted"})
        })
    }