const User = require('../../models/user')

const getAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      })
    })
}

const getById = (req, res) => {
  user.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        })
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        })
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      })
    })
}

const insert = (req, res) => { 
  if (!req.body.name) {
    return res.status(400).send({
      message: "user content can not be empty"
    })
  }
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  })
  user.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      })
    })
}

const remove = (req, res) => {
  user.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        })
      }
      res.send({
        message: "user deleted successfully!"
      })
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        })
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
      })
    })
}

module.exports = {
  getAll,
  getById,
  insert,
  remove,
}