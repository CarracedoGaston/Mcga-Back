const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./app/router')

const app = express ()
const port = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const mongoDBURL = require('./config/database.config')

mongoose.connect(mongoDBURL.url, {
  useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
  process.exit()
})

app.use('/api', router)

app.listen(port,  () => {
  console.log(`Example app listening on port ${port}!`)
})