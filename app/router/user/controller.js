const User = require('../../models/user.model')
const sha256 = require('sha256')
const jwt = require('jsonwebtoken')
const service = require('../../services')

const getAll = (req, res) => {
  User.find({}, {password: 0, __v: 0},  (err, users) => {
    if (err) res.send({msg: 'Cant`t get the user list', error: err})
    res.send(users)
  })
}

const getById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.send({msg: `Cant't get the user ${req.params.id}`, error: err})
    res.send(user)
  }) 
}

const insert = (req, res) => { 
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password:  sha256(req.body.password)
  })
  user.save((err) => {
    if (err) res.send({msg: 'Cant`t save the user', error: err})
    res.send('User saved')
  })
}

const signUp = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password:  sha256(req.body.password)
  })
  user.save((err) => {
    if (err) res.status(500).send({msg: 'Cant`t save the user: ${err}'})
    res.status(200).send({token: service.createToken(user)})
  })
}

const signIn = (req, res) => {
  const { name, password } = req.body
  User.findOne(
    { name, password: sha256(password) },
    { password: 0 },
    (err, user) => {
    if (err) return res.status(500).send({ msg: 'Server Error', error: err })
    if (!user) return res.status(404).send({ msg: 'Invalid Email or password', error: err })
    req.user= user
    res.status(200).send({messagge: 'you are logged', token: service.createToken(user)})
  })
}

const upsert  = (req, res) => {
  User.updateOne({_id: req.params.id}, {...req.body}, (err) => {
    if (err) res.send({msg: `Cant't upsert the user ${req.params.id}`, error: err})
    res.send('User upserted')
  })
}

const update  = (req, res) => {
  User.updateOne({_id: req.params.id}, {[Object.keys(req.body)]: req.body[Object.keys(req.body)]}, (err) => {
    if (err) res.send({msg: `Cant't update the user ${req.params.id}`, error: err})
    res.send('User updated')
  })
}

const remove = (req, res) => {
  User.deleteOne({_id: req.params.id}, (err) => {
    if (err) res.send({msg: `Cant't delete the user ${req.params.id}`, error: err})
    res.send('User deleted')
  }) 
}

module.exports = {
  getAll,
  getById,
  insert,
  upsert,
  update,
  remove,
  signIn, 
  signUp
}