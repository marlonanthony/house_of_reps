const router = require('express').Router() 
const gravatar = require('gravatar') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const keys = require('../../config/keys')
const passport = require('passport')
const Mailer = require('../../services/Mailer')
const updateTemplate = require('../../services/email_templates/updateTemplate')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User Model
const User = require('../../models/User')
const Token = require('../../models/Token')

router.post('/confirm', (req, res) => {
  Token.findOne({ token: req.body.token }).then(response => {
    User.findById(response._userId)
    .then(user => {
      if(user) {
        user.isVerified = true 
        user.save()
        res.json({
          _id: user.id, // might use id, email, and handle. not sure yet. else get rid of them
          email: user.email,
          handle: user.handle,
          isVerified: user.isVerified
        })
      }
    })
    .catch(err => console.log(err))
  })
})

// @route         POST api/users/register
// @description   Register a user
// @access        Public 
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body) 
  const { name, handle, email, password } = req.body
  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors) 
  }

  User.findOne({ email })
  .then(user => {
    if(user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors) 
    } else {
      const avatar = gravatar.url(email, {
        s: '200',   // Size
        r: 'pg',   // rating 
        d: 'mm'   // default
      })
      const newUser = new User({
        name,
        handle,
        email,
        avatar: req.body.avatar ? req.body.avatar : avatar,
        password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err 
          newUser.password = hash 
          newUser.save()

          .then(user => { 
            let num = Math.floor((Math.random() * 10000000000) + 1)
            const token = new Token({
              _userId: user._id,
              token: num
            })
              token.save() 
            // const { recipients } = req.body 
            const emailInfo = {
              subject: 'Testing the register route',
              body: "Bruh, I'm fittin to write all the emails!",
              recipients: 'mad1083@yahoo.com', // change this to email after testing
              token: token.token
            }
            
            const mailer = new Mailer(emailInfo, updateTemplate(emailInfo))
            mailer.send() 
            res.json(user)
          })
          .catch(err => console.log(err)) 
        })
      })
    }
  })
  .catch(err => console.log(err)) 
})


/////////////////////////////////////////////////////////           TESTING USER UPDATE          ///////////////////////////////////////////////////
router.post('/update/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
  .then(user => {
    const { email, body, title, subject, recipients, token } = req.body 
    const emailInfo = {
      title,
      subject,
      body,
      recipients,
      token
    }
    
    const mailer = new Mailer(emailInfo, updateTemplate(emailInfo))
    mailer.send() 
    // await mailer.send() 
    // await user.save()
 
    // res.json(user) 
  })
  .catch(err => console.log(err)) 
})

// @route         POST api/users/login
// @description   Login User / Returning JWT Token
// @access        Public 
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body) 

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors) 
  }

  const email = req.body.email
  const password = req.body.password 

  // Find user by email
  User.findOne({ email })
  .then(user => {
    // Check for user
    if(!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }
    // Check Password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch) {
        // User Matched 
        const payload = { id: user.id, name: user.name, avatar: user.avatar, handle: user.handle }
        // Sign Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 604800 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token 
          })
        })
      } else {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors)
      }
    })
  })
})

// @route         GET api/users/current
// @description   Return current user
// @access        Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
    handle: req.user.handle,
  })
})
module.exports = router  