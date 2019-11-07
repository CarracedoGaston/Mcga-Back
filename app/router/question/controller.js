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
    res.send('Question saved')
  })
}

const upsert  = (req, res) => {
  Question.updateOne({_id: req.params.id}, {...req.body}, (err) => {
    if (err) res.send({msg: `Cant't upsert the question ${req.params.id}`, error: err})
    res.send('Question upserted')
  })
}

const update  = (req, res) => {
  Question.updateOne({_id: req.params.id}, {[Object.keys(req.body)]: req.body[Object.keys(req.body)]}, (err) => {
    if (err) res.send({msg: `Cant't update the question ${req.params.id}`, error: err})
    res.send('Question updated')
  })
}

const remove = (req, res) => {
  Question.deleteOne({_id: req.params.id}, (err) => {
    if (err) res.send({msg: `Cant't delete the question ${req.params.id}`, error: err})
    res.send('Question deleted')
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