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
unprotected = {

}

protected = {
    
}
module.exports = {
    signUp: async(req, res, next) => {
        try {
            const {
                name
                } = req.body
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
    login: (req, res, next) => {
            console.log(req.body)
            User.findOne({
                name: req.body.name
            }, (err, user) => {
                console.log(user)
                let isValid = bcrypt.compare(req.body.password, user.rspassword, function(err, res) {
                    if (err) {
                        throw err
                    }
                })
                console.log(isValid)
                if (err) return res.status(500).send('Error on the server.')
                if (!user) 
                {
                    res.status(404).json({
                        success: false,
                        message: 'Authentication failed. User not found.'
                    })
                }
                else if (isValid) 
                {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    })
                }
                else 
                {
                   let newUser = user
                    delete newUser.password
                    console.log(newUser) 
                    let token = jwt.sign({user: newUser}, config.secret, {
                        expiresIn: 60 * 60 * 24
                    })
                    res.json({
                        success: true,
                        message: 'you have a token',
                        token: token
                            })
                }
            })
    },
    users: (req, res, next) => {
        User.find({}, (err, users) => {
            if (err) return res.status(500).send("there was a problem finding user.")
            res.json(users)
        })
    },
    verifyToken: (req, res, next) => {
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
    me: (req, res, next) => {
        User.findById(res.decoded.user._id, (err, user) => {
            if (err) throw err
            res.json(user)
        })
    },
    update:(req, res, next) => {
        let updateUser = req.body
        User.findByIdAndUpdate(res.decoded.user._id, updateUser, (err, updateUser) => {
            if (err) throw err
            res.status(200).json({ success: true})
        })
    },
    delete: (req, res, next) => {
        User.findByIdAndRemove(res.decoded.user._id, (err, user) => {
            if (err) throw err
            res.status(200).json({message: "User has beed deleted"})
        })
    }
}