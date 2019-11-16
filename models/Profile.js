const mongoose = require('mongoose')

const { Schema } = mongoose

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  avatar: {
    type: String
  },
  banner: {
    type: String
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  stageName: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String,
    max: 280
  },
  style: {
    type: String
  },
  chatroomInvites: [{
    type: Schema.Types.ObjectId,
    ref: 'chatroom'
  }],
  chatroomMemberships: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'chatroom'
      },
      name: {
        type: String
      }
    }
  ],
  venues: [
    {
      title: {
        type: String
      },
      location: {
        type: String
      },
      date: {
        type: Date
      },
      description: {
        type: String
      },
      video: {
        type: String
      },
      image: {
        type: String
      },
      dateCreated: {
        type: Date,
        default: Date.now
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    }
  ],
  djpools: [
    {
      image: {
        type: String
      },
      url: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  stores: [
    {
      image: {
        type: String
      },
      url: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  perks: [
    {
      image: {
        type: String
      },
      url: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  brands: [
    {
      image: {
        type: String
      },
      url: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    soundcloud: {
      type: String
    },
    spotify: {
      type: String
    },
    mixcloud: {
      type: String
    },
    youtube: {
      type: String
    }
  },
  notifications: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      avatar: {
        type: String
      },
      postImage: {
        type: String
      },
      postText: {
        type: String
      },
      video: {
        type: String
      },
      highlight: {
        type: Object
      },
      post: {
        type: Object
      },
      comment: {
        type: Object
      },
      postId: {
        type: String
      },
      commentId: {
        type: String
      },
      message: {
        type: String
      },
      seen: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('profile', ProfileSchema)
