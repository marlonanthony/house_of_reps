const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// Create Schema 
const PostSchema = new Schema({
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
  avatar: {
    type: String 
  },
  image: {
    type: String 
  },
  title: {
    type: String 
  },
  description: {
    type: String 
  },
  url: {
    type: String 
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true 
      },
      avatar: {
        type: String 
      },
      date: {
        type: Date,
        default: Date.now 
      },
      image: {
        type: String
      },
      title: {
        type: String 
      },
      description: {
        type: String 
      },
      url: {
        type: String 
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now 
  }
})

module.exports = Post = mongoose.model('post', PostSchema)