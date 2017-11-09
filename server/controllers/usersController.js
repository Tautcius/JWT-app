const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

signToken = user =>{
    return jwt.sign({
        exp: 1440
    }, config.secret)
}

module.exports = {
    index: async (req, res, next) => {
        try {
            const users = await User.find({})
            res.status(200).json(users)
        } catch(err){
            next(err)
        }
    },
    newUser: async (req, res, next) => {
        try {
            const { name } = req.body
            const foundUser = await User.findOne({ name })
            if (foundUser) {
                return res.status(401).json({ error: 'name is in use'})
            }
            const newUser = new User(req.body)
            await newUser.save()
            //generate token
            const token = signToken(newUser)
            //respond with token
            res.status(200).json({ token })
        } catch(err) {
            next(err)
        }
        
    },
    login: async (req, res, next) => {
        try {
       await User.findOne({ 
            name: req.body.name
         }, (err, user) => {
     if (err) return res.status(500).send('Error on the server.')
     if (!user) {
         res.status(404).json({ success: false, message: 'Authentication failed. User not found.' })
               }
           else if (user.password != req.body.password) {
                 res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' })
                } else {
                    const payload = {
                        admin: req.body.admin
                    }
                const token = signToken (user)
                res.json({
                    success: true,
                    message: 'you have a token',
                    token: token
                })
              }
            }
        )
    } catch(err) {
        next(err)
    }
    },
    protected: async (req, res, next) => {
        let token = req.body.token || req.query.token || req.headers['x-access-token']
        console.log(token)
        if (!token) return res.status(401).send({auth: false, message: 'No token provided.'})
    
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'})
            
        User.findById(decoded.id, (err, user) => {
            if (err) return res.status(500).send("there was a problem finding user.")
            if (!user) return res.status(404).send("No user found")
    
            res.status(200).send(user)
        })
        })
    }
}
