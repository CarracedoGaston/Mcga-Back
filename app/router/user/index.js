const express = require('express')
const controller = require('./controller')
const auth = require('../../middlewares/auth')

const router = express.Router()
const  {
  getAll,
  getById,
  insert,
  upsert,
  update,
  remove,
  signIn,
  signUp
} = controller

router.use(express.json())

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', insert)
router.post('/signIn', signIn)
router.post('/signUp', signUp)
router.put('/:id', upsert)
router.patch('/:id', update)
router.delete('/:id', remove)

module.exports = router

