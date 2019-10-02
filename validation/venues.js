const Validator = require('validator') 
const isEmpty = require('./is-empty')

module.exports = function validateVenuesInput(data) {
  const errors = {} 
  
  data.title = !isEmpty(data.title) ? data.title : '' 
  data.location = !isEmpty(data.location) ? data.location : '' 
  data.date = !isEmpty(data.date) ? data.date : '' 
  data.description = !isEmpty(data.description) ? data.description : '' 
  data.video = !isEmpty(data.video) ? data.video : '' 
  data.image = !isEmpty(data.image) ? data.image : '' 

  if(Validator.isEmpty(data.image) && Validator.isEmpty(data.video)) {
    errors.description = 'Add image or video'
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  }
}