const mongoose = require('mongoose')

const { Schema } = mongoose

const TokenSchema = new mongoose.Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 3600
  }
})

module.exports = mongoose.model('token', TokenSchema)
