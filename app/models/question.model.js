const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  gameType: { type: Schema.Types.ObjectId, ref: 'GameType'},
  title: { type: String, required: true, max: 30},
  firstAnswer: { type: String, required: true, max: 30},
  secondAnswer: { type: String, required: true, max: 30},
  thirdAnswer: { type: String, required: true, max: 30},
  firstQuantity: { type: Number, required: true, min: 0},
  secondQuantity: { type: Number, required: true, min: 0},
  thirdQuantity: { type: Number, required: true, min: 0}
})

module.exports = mongoose.model('Question', QuestionSchema)