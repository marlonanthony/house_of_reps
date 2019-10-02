const Validator = require('validator') 
const isEmpty = require('./is-empty')

module.exports = function validateDjpoolsInput(data) {
  const errors = {} 
  
  data.image = !isEmpty(data.image) ? data.image : '' 
  data.url = !isEmpty(data.url) ? data.url : '' 

  if(Validator.isEmpty(data.image)) {
    errors.image = 'image is required'
  }

  if(Validator.isEmpty(data.url)) {
    errors.url = 'url is required'
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  }
}