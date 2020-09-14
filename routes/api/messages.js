const router = require('express').Router()
const withAuth = require('../../utils/withAuth')
const {createMessage, getMessages} = require('../../controllers/message-controller')

// /api/messages

router
.route('/')
.post(withAuth, createMessage)

router
.route('/:chatroomId')
.get(withAuth, getMessages)

module.exports = router