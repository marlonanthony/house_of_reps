const router = require('express').Router() 
const gravatar = require('gravatar') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const keys = require('../../config/keys')
const passport = require('passport')

const Mailer = require('../../services/Mailer')
const updateTemplate = require('../../services/email_templates/updateTemplate')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const User = require('../../models/User')
const Token = require('../../models/Token')

// @route     POST api/users/confirm
// @desc      Confirm email address
// @access    Public?
router.post('/confirm', async (req, res) => {
  try {
    const response = await Token.findOne({ token: req.body.token })
    const user = await User.findById(response._userId)
    if(!user) throw new Error('User not found')
    user.isVerified = true
    await user.save()
    return res.json({
      _id: user.id, // might use id, email, and handle. not sure yet. else get rid of them
      email: user.email,
      handle: user.handle,
      isVerified: user.isVerified
    })
  } catch(err) { throw err }
})

// @route         POST api/users/register
// @description   Register a user
// @access        Public 
router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body) 
    const { name, handle, email, password } = req.body

    if(!isValid) {
      return res.status(400).json(errors) 
    }

    const user = await User.findOne({ email })

    if(user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors) 
    } 

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
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if(err) throw err 
        newUser.password = hash 
        const savedUser = await newUser.save()
        let num = Math.floor((Math.random() * 10000000000) + 1)
        const token = new Token({
          _userId: savedUser._id,
          token: num
        })
        await token.save() 
        const emailInfo = {
          subject: 'Testing the register route',
          body: "Bruh, I'm fittin to write all the emails!",
          recipients: 'mad1083@yahoo.com', // change this to email after testing
          token: token.token
        }
        const mailer = new Mailer(emailInfo, updateTemplate(emailInfo))
        await mailer.send() 
        return res.json(user)
      })
    })
  } catch(err) { throw err }
})


/////////////////////////////////////////////////////////           TESTING USER UPDATE          ///////////////////////////////////////////////////
router.post('/update/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
  .then(user => {
    const handle = req.body.handle
    user.handle = handle 
    user.save().then(user => res.json(user)) 
    // const { email, body, title, subject, recipients, token } = req.body 
    // const emailInfo = {
    //   title,
    //   subject,
    //   body,
    //   recipients,
    //   token
    // }
    
    // const mailer = new Mailer(emailInfo, updateTemplate(emailInfo))
    // mailer.send() 
    // await mailer.send() 
    // await user.save()
 
    // res.json(user) 
  })
  .catch(err => console.log(err)) 
})

// @route         POST api/users/login
// @description   Login User / Returning JWT Token
// @access        Public 
router.post('/login', async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body) 
    if(!isValid) return res.status(400).json(errors) 
    const email = req.body.email
    const password = req.body.password 
    const user = await User.findOne({ email })
    if(!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) {
      // User Matched 
      const payload = { id: user.id, name: user.name, avatar: user.avatar, handle: user.handle, isAdmin: user.isAdmin }
      // Sign Token
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 10800 }, (err, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token 
        })
      })
    } else {
      errors.password = 'Password incorrect'
      return res.status(400).json(errors)
    }
  } catch(err) { throw err }
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