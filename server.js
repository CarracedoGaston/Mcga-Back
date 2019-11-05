const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')

const app = express ()
const port = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const mongoDBURL = 
'mongodb+srv://Gaston:1234@clusterdb-1esq3.mongodb.net/MCGA-FINAL'

mongoose.connect(dbConfig.url, {
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