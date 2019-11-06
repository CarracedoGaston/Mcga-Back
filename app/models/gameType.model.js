const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameTypeSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: { type: String, required: true, max: 30}
})

module.exports = mongoose.model('GameType', GameTypeSchema)