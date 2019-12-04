const express = require('express')
const controller = require('./controller')
const auth = require('../../middlewares/auth')


const router = express.Router()
const  {
  getAll,
  getById,
  getByUser, 
  insert,
  upsert,
  update,
  remove
} = controller

router.use(express.json())

router.get('/', getAll)
router.get('/:id', getById)
router.get('/user/:user', getByUser)
router.post('/', auth, insert)
router.put('/:id', auth, upsert)
router.patch('/:id', auth, update)
router.delete('/:id', auth, remove)

module.exports = router