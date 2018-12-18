const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'   // Reference the collection
  },
  avatar: {
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
    type: String
  },
  style: {
    type: String
  },
  venues: [
    {
      title: {
        type: String
      },
      location: {
        type: String,
        required: true 
      },
      date: {
        type: Date,
        required: true 
      },
      description: {
        type: String 
      },
      video: {
        type: String 
      }
    }
  ],
  djpools: [
    {
      image: {
        type: String 
      },
      url: {
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
  date: {
    type: Date,
    default: Date.now 
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema) 