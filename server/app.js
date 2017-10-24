const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const port = app.get('port') || 3000
app.listen(port, () => console.log(`Server is running on ${port}`))