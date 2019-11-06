const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: { type: String, required: true, max: 30},
  email: { type: String, required: true, max: 30},
  password: { type: String, required: true, max: 30}
})

module.exports = mongoose.model('User', UserSchema)