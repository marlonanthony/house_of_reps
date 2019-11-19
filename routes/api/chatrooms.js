const router = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')

const Chatroom = require('../../models/Chatroom')
const Profile = require('../../models/Profile')

// @route           POST api/chat
// @desc            Create a Chatroom
// @access          Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    const {name, invites, moderators} = req.body
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      const chatroom = await new Chatroom({
        name: name && name.trim(),
        admin: { id: req.user.id, handle: profile.handle },
        invites,
        moderators
      })
      await chatroom.save()
      const invitesList = []
      invites.forEach(val => invitesList.push(val.id))
      // const profile = await Profile.updateMany({ user: { $in: invitesList}},
      //   {$push: { chatroomInvites: { name, id: chatroom._id }}})
      const profiles = await Profile.find({ user: { $in: invitesList }})
      profiles.forEach(async profile => {
        profile.chatroomInvites.push({ name, id: chatroom._id })
        profile.save()
        // add to notifications
      })
      return res.json(chatroom)
    } catch (error) { return res.status(400).json({ error }) }
  }
)

// @route         GET api/chat/:id
// @desc          Get chatroom by id
// @access        Private
router.get(
  '/:id', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    try {
      const chatroom = await Chatroom.findById(req.params.id)
      if(!chatroom) return res.status(404).json({ error: 'Chatroom not found' })
      const myInvite = chatroom.invites.filter(person => String(person.id) === req.user.id)[0]
      const member = chatroom.members.filter(person => String(person.id) === req.user.id)[0]
      if(String(chatroom.admin.id) !== req.user.id && !myInvite && !member) {
        return res.status(401).json({ error: 'You can\'t sit with us' })
      }
      return res.json(chatroom)
    } catch(error) {
      return res.status(400).json({ error })
    }
  }
)

// @route         POST api/chat/accept/:id
// @desc          Accept chatroom invite
// @access        Private
router.post(
  '/accept/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const chatroom = await Chatroom.findById(req.params.id)
      if(!chatroom) return res.status(404).json({ error: 'Chatroom not found' })
      const myInvite = chatroom.invites.filter(person => String(person.id) === req.user.id)[0]
      const member = chatroom.members.filter(person => String(person.id) === req.user.id)[0]
      if(String(chatroom.admin) !== req.user.id && !myInvite && !member) {
        return res.status(401).json({ error: 'You can\'t sit with us' })
      }
      const profile = await Profile.findOne({ user: req.user.id })
      if(myInvite && req.user.id === String(myInvite.id)) {
        const index = chatroom.invites
        .map((obj, i) => String(obj.id) === req.user.id && i)
        .filter(val => val)[0]
        chatroom.invites.splice(index, 1)
        chatroom.members.push(myInvite)
        await chatroom.save()
        
        profile.chatroomMemberships.push({ name: chatroom.name, id: req.params.id })
        const i = profile.chatroomInvites.indexOf(req.params.id)
        profile.chatroomInvites.splice(i, 1)
        await profile.save()
        return res.json(chatroom)
      }
    } catch (err) {
      return res.status(400).json(err)
    }
  }
)

// @route         DELETE api/chat/:id
// @desc          Delete chatroom
// @access        Private
router.delete(
  '/:id', 
  passport.authenticate('jwt', { session: false }), 
  async(req, res) => {
    try {
      await Profile.updateMany({}, {$pull: { chatroomInvites: { id: req.params.id }}})
      await Profile.updateMany({}, {$pull: { chatroomMemberships: { id: req.params.id }}})
      const chatroom = await Chatroom.findById(req.params.id)
      chatroom.remove()
      const profile = await Profile.findOne({ user: req.user.id })
      return res.json(profile)
    } catch (err){
      return res.status(404).json(err)
    }
  }
)

module.exports = router