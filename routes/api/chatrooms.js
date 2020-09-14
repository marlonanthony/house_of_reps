const router = require('express').Router()
const withAuth = require('../../utils/withAuth')
const {
  createChatroom, 
  getChatroomById,
  acceptChatroomInvite,
  inviteToChatroom,
  deleteChatroom,
  leaveChatroom
} = require('../../controllers/chatroom-controller')

// /api/chat

router
.route('/')
.post(withAuth, createChatroom)

router
.route('/:id')
.get(withAuth, getChatroomById)
.delete(withAuth, deleteChatroom)

router
.route('/accept/:id')
.post(withAuth, acceptChatroomInvite)

router
.route('/add_members/:id')
.put(withAuth, inviteToChatroom)

router
.route('/profile/:chatId')
.delete(withAuth, leaveChatroom)

module.exports = router