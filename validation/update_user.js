const Validator = require('validator'),
  isEmpty = require('./is-empty')

module.exports = function validateUpdateUser(data){
  const errors = {}

  data.password = !isEmpty(data.password) ? data.password : ''
  data.new_password = !isEmpty(data.new_password) ? data.new_password : ''
  data.confirm_new_password = !isEmpty(data.confirm_new_password) ? data.confirm_new_password : ''

  if(Validator.isEmpty(data.password)){
    errors.password = 'Password is required'
  }

  if(!Validator.isLength(data.new_password, { min: 6, max: 30 })){
    errors.new_password = 'Password must be at least 6 characters'
  }
  if(Validator.isEmpty(data.new_password)){
    errors.new_password = 'Password is required'
  }

  if(!Validator.equals(data.new_password, data.confirm_new_password)){
    errors.confirm_new_password = 'New Passwords must match'
  }
  if(Validator.isEmpty(data.confirm_new_password)){
    errors.confirm_new_password = 'Confirm Your New Password'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}