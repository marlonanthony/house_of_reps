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
  handle: {
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
  media: {
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
      name: {
        type: String 
      },
      handle: {
        type: String 
      },
      avatar: {
        type: String 
      },
      date: {
        type: Date,
        default: Date.now 
      },
      // linkpreview 
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
      // upload image
      media: {
        type: String 
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now 
  }
})

PostSchema.index({ text: 'text' })

module.exports = Post = mongoose.model('post', PostSchema)