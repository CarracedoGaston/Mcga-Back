const User = require('../../models/user.model')
const sha256 = require('sha256')

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

const signIn = (req, res) => { 
  const user = new User({
    name: req.body.name, 
    password: sha256(req.body.password)
  })
  User.findOne({name: user.name, password: user.password}, (err, user) => {
    if(err) res.send({msg: 'dont'})
    res.send(user)
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
  signIn
}