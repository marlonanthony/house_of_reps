const router = require('express').Router()
const passport = require('passport')
const Message = require('../../models/Message')
const Chatroom = require('../../models/Chatroom')

// @route         POST api/messages
// @description   Create message
// @access        Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if(!req.body.message) return res.status(400).json({message: 'Best to type something!'})
      const newMessage = new Message({
        message: req.body.message.trim(),
        chatroom: req.body.chatroom,
        user: req.user.id
      })
      await newMessage.save()
      return res.status(201).json(newMessage)
    } catch (err) {
      res.status(400).json(err)
    }
  }
)

// @route   GET api/messages/:chatroomId
// @desc    Get messages for chatroom
// @access  Private
router.get(
  '/:chatroomId', 
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const messages = await Message.find({
        chatroom: req.params.chatroomId
      })
      .sort({ createdAt: 'ascending' })
      .populate('user', ['name', 'avatar', 'handle'])
      return res.json(messages)
    } catch (err) {
      console.log(err)
    }
  }
)

module.exports = router