const express = require('express')
const controller = require('./controller')

const router = express.Router()
const  {
  getAll,
  getById,
  insert,
  upsert,
  update,
  remove,
  signIn
} = controller

router.use(express.json())

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', insert)
router.post('/signIn', signIn)
router.put('/:id', upsert)
router.patch('/:id', update)
router.delete('/:id', remove)

module.exports = router

