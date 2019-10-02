const Validator = require('validator') 
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {} 

  if(!Validator.isLength(data.bio, { max: 280 })) {
    errors.bio = 'Bio needs to be 280 characters or less'
  }
  
  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website.trim())) {
      errors.website = 'Not a valid URL'
    }
  }
  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter.trim())) {
      errors.twitter = 'Not a valid URL'
    }
  }
  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram.trim())) {
      errors.instagram = 'Not a valid URL'
    }
  }
  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook.trim())) {
      errors.facebook = 'Not a valid URL'
    }
  }
  if(!isEmpty(data.linkedin)) {
    if(!Validator.isURL(data.linkedin.trim())) {
      errors.linkedin = 'Not a valid URL'
    }
  }
  if(!isEmpty(data.soundcloud)) {
    if(!Validator.isURL(data.soundcloud.trim())) {
      errors.soundcloud = 'Not a valid URL'
    }
  }
  if(!isEmpty(data.spotify)) {
    if(!Validator.isURL(data.spotify.trim())) {
      errors.spotify = 'Not a valid URL'
    }
  }
  if(!isEmpty(data.mixcloud)) {
    if(!Validator.isURL(data.mixcloud.trim())) {
      errors.mixcloud = 'Not a valid URL'
    }
  }
  if(!isEmpty(data.youtube)) {
    if(!Validator.isURL(data.youtube.trim())) {
      errors.youtube = 'Not a valid URL'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  }
}