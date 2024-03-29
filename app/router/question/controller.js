const Question = require('../../models/question.model')

const getAll = (req, res) => {
  Question.find({}, {password: 0, __v: 0},  (err, question) => {
    if (err) res.send({msg: 'Cant`t get the question list', error: err})
    res.send(question)
  })
}

const getById = (req, res) => {
  Question.findById(req.params.id, (err, question) => {
    if (err) res.send({msg: `Cant't get the question ${req.params.id}`, error: err})
    res.send(question)
  }) 
}

const getByUser = (req, res) => {
  Question.find({user: req.params.user }, (err, question) => {
    if (err) res.send({msg: `Cant't get the question List ${req.params.user}`, error: err})
    res.send(question)
  }) 
}

const insert = (req, res) => { 
  const question = new Question({
    title: req.body.title,
    user: req.body.user,
    gameType: req.body.gameType,
    firstAnswer: req.body.firstAnswer,
    secondAnswer: req.body.secondAnswer,
    thirdAnswer: req.body.thirdAnswer,
    firstQuantity: req.body.firstQuantity,
    secondQuantity: req.body.secondQuantity,
    thirdQuantity: req.body.thirdQuantity
  })
  question.save((err) => {
    if (err) res.send({msg: 'Cant`t save the question', error: err})
    res.status(200).json(question)
  })
}

const upsert  = (req, res) => {
  Question.updateOne({_id: req.params.id}, {...req.body})
  .then(question => {
    res.status(200).json(question)
  })
  .catch(error => {
    res.status(400).json({error:error})
  })
}

const update  = (req, res) => {
  Question.updateOne({_id: req.params.id}, {...req.body})
  .then(question => {
    res.status(200).json(question)
  })
  .catch(error => {
    res.status(400).json({error:error})
  })
}

const remove = (req, res) => {
  Question.deleteOne({_id: req.params.id})
  .then( question => {
    if(question) {
      res.status(200).json(question)
    }
    else {
      res.status(400).json({error:error})
    }
  })
  .catch(error => {
    res.status(400).json({error:error})
    }
  )
}

module.exports = {
  getAll,
  getById,
  getByUser,
  insert,
  upsert,
  update,
  remove
}