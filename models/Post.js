const mongoose = require('mongoose')

const { Schema } = mongoose

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String
  },
  tag: {
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
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      handle: {
        type: String
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
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          handle: {
            type: String
          }
        }
      ],
      // Nested Comments
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
              },
              name: {
                type: String
              },
              avatar: {
                type: String
              },
              handle: {
                type: String
              }
            }
          ],
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
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
}, {
  timestamps: true
})

PostSchema.index({ text: 'text' })

module.exports = mongoose.model('post', PostSchema)
