const Validator = require('validator') 
const isEmpty = require('./is-empty')

module.exports = function validateVenuesInput(data) {
  let errors = {} 
  
  data.title = !isEmpty(data.title) ? data.title : '' 
  data.location = !isEmpty(data.location) ? data.location : '' 
  data.date = !isEmpty(data.date) ? data.date : '' 
  data.description = !isEmpty(data.description) ? data.description : '' 
  data.video = !isEmpty(data.video) ? data.video : '' 
  data.image = !isEmpty(data.image) ? data.image : '' 

  if(Validator.isEmpty(data.title)) {
    errors.title = 'title is required'
  }
  if(Validator.isEmpty(data.location)) {
    errors.location = 'location is required'
  }
  if(Validator.isEmpty(data.date)) {
    errors.date = 'date is required'
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  }
}