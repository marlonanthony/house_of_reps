const Validator = require('validator') 
const isEmpty = require('./is-empty')

module.exports = function validateCommentInput(data) {
  const errors = {} 
  if(data) data.text = !isEmpty(data.text) ? data.text : ''
  if(data) data.media = !isEmpty(data.media) ? data.media : ''
  if(data) data.image = !isEmpty(data.image) ? data.image : ''

  if(
    Validator.isEmpty(data.text) && 
    Validator.isEmpty(data.media) && 
    Validator.isEmpty(data.image)
  ) {
    errors.text = 'Content is required'
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  }
}