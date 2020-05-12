const Validator = require('validator') 
const isEmpty = require('./is-empty')
const keys = require('../config/keys')

module.exports = function validateRegisterInput(data) {
  const errors = {} 
  data.name = !isEmpty(data.name) ? data.name : '' 
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.email = !isEmpty(data.email) ? data.email : '' 
  data.avatar = !isEmpty(data.avatar) ? data.avatar : ''
  data.password = !isEmpty(data.password) ? data.password : '' 
  data.password2 = !isEmpty(data.password2) ? data.password2 : '' 
  data.code = !isEmpty(data.code) ? data.code : ''

  if(!Validator.isLength(data.name, { min: 2, max: 30 })){
    errors.name = 'Name must be between 2 and 30 characters.'
  }
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name is required'
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Hanlde needs to be between 2 and 40 characters'
  }
  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required'
  }

  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }
  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Your Password'
  }

  if(!Validator.equals(data.code, keys.code)){
    errors.code = 'Wrong code pleb!'
  }
  if(Validator.isEmpty(data.code)){
    errors.code = 'Enter Secret Code'
  }


  return {
    errors,
    isValid: isEmpty(errors) 
  }
}