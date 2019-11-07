const GameType = require('../../models/GameType.model')

const getAll = (req, res) => {
    GameType.find({}, {password: 0, __v: 0},  (err, users) => {
    if (err) res.send({msg: 'Cant`t get the type list', error: err})
    res.send(users)
  })
}

const getById = (req, res) => {
    GameType.findById(req.params.id, (err, user) => {
    if (err) res.send({msg: `Cant't get the type ${req.params.id}`, error: err})
    res.send(user)
  }) 
}

const insert = (req, res) => { 
  const gameType = new GameType({
    name: req.body.name
  })
  gameType.save((err) => {
    if (err) res.send({msg: 'Cant`t save the type', error: err})
    res.send('GameType saved')
  })
}

const upsert  = (req, res) => {
  GameType.updateOne({_id: req.params.id}, {...req.body}, (err) => {
    if (err) res.send({msg: `Cant't upsert the type ${req.params.id}`, error: err})
    res.send('GameType upserted')
  })
}

const update  = (req, res) => {
    GameType.updateOne({_id: req.params.id}, {[Object.keys(req.body)]: req.body[Object.keys(req.body)]}, (err) => {
    if (err) res.send({msg: `Cant't update the type ${req.params.id}`, error: err})
    res.send( 'GameType updated')
  })
}

const remove = (req, res) => {
  GameType.deleteOne({_id: req.params.id}, (err) => {
    if (err) res.send({msg: `Cant't delete the gameType ${req.params.id}`, error: err})
    res.send('GameType deleted')
  }) 
}

module.exports = {
  getAll,
  getById,
  insert,
  upsert,
  update,
  remove
}