const mongoose = require('mongoose')
const { Schema, model } = mongoose

const PromoSchema = new Schema({
  url: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('promo', PromoSchema)