const router = require('express').Router()
const passport = require('passport')
const {createMessage, getMessages} = require('../../controllers/message-controller')

router
.route('/')
.post(passport.authenticate('jwt', { session: false }), createMessage)

router
.route('/:chatroomId')
.get(passport.authenticate('jwt', { session: false }), getMessages)

module.exports = router