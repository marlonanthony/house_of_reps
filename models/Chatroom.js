const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ChatRoomSchema = new Schema({
  count: {
    type: Number,
    default: 0
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  admin: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    handle: {
      type: String
    },
    name: {
      type: String
    }
  },
  moderators: [
    {
      name: {
        type: String
      },
      id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      handle: {
        type: String
      }
    }
  ],
  invites: [
    {
      name: {
        type: String
      },
      id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      handle: {
        type: String
      }
    }
  ],
  members: [
    {
      name: {
        type: String
      },
      id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      handle: {
        type: String
      }
    }
  ]
}, {
  timestamps: true
})

module.exports = model('chatrooms', ChatRoomSchema)