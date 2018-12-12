const Validator = require('validator') 
const isEmpty = require('./is-empty')

module.exports = function validatePerksInput(data) {
  let errors = {} 
  
  data.image = !isEmpty(data.image) ? data.image : '' 
  data.url = !isEmpty(data.url) ? data.url : '' 
  data.description = !isEmpty(data.description) ? data.description : '' 

  if(Validator.isEmpty(data.image)) {
    errors.image = 'image is required'
  }

  if(Validator.isEmpty(data.url)) {
    errors.url = 'url is required'
  }

  if(Validator.isEmpty(data.description)) {
    errors.description = 'description is required'
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  }
}