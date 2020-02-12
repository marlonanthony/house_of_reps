const Validator = require('validator') 
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  const errors = {} 
  if(data) data.text = !isEmpty(data.text) ? data.text : ''
  if(data) data.media = !isEmpty(data.media) ? data.media : ''
  if(data) data.tag = !isEmpty(data.tag) ? data.tag : ''
  if(data) data.image = !isEmpty(data.image) ? data.image : ''

  // if(!Validator.isLength(data.text, { min: 1, max: 500 })) {
  //   errors.text = 'Post must be between 1 and 500 characters'
  // }

  if(Validator.isEmpty(data.text) && Validator.isEmpty(data.media) && Validator.isEmpty(data.image)) {
    errors.text = 'Content is required'
  }
  if(Validator.isEmpty(data.tag)) {
    errors.text = 'Choose a tag for your post!'
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  }
}