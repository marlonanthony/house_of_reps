const mongoose = require('mongoose')
const { Schema, model } = mongoose

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  chatroom: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('messages', MessageSchema)