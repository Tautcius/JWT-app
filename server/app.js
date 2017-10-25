const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/JWT-app',{ useMongoClient: true })

const app = express()

const users = require('./routes/users')

// Midddleware
app.use(morgan('dev'))
app.use(bodyParser.json())

//Routes
app.use('/users', users)

//Catch 404 Errors and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  });
  //Error Handler function
  app.use((err, req, res, next) => {
    const error = app.get('env') === 'develompent' ? err : {}
    const status = err.status || 500
    //Respond to client
    res.status(status).json({
      error: {
        message: error.message
      }
    })
    //Respond to server
    console.error(err)
  })

// Start server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on ${port}`))
