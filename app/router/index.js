const express = require('express')
const user = require('./user')
const question = require('./question')
const gameType = require('./gameType')

const router = express.Router()

router.use('/user', user)
router.use('/question', question)
router.use('/gameType', gameType)

module.exports = router