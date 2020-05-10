const mongoose = require('mongoose')
const { Schema } = mongoose

const PromoSchema = new Schema({
  url: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  createdBy: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('promo', PromoSchema)