const mongoose = require('mongoose')

const { Schema } = mongoose

const ChatRoomSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  },
  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      handle: {
        type: String
      },
      avatar: {
        type: String
      },
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('chatroom', ChatRoomSchema)