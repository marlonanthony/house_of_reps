const router = require('express').Router()
const passport = require('passport')

const Chatroom = require('../../models/Chatroom')
const Profile = require('../../models/Profile')

// @route           POST api/chat
// @desc            Create a Chatroom
// @access          Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    try {
      const chatroom = await new Chatroom({
        name: req.body.name && req.body.name.trim(),
        admin: req.user.id,
        // REPLACE STATIC IDS
        invites: [
          '5d90285ff4b336001681f6c0', 
          '5baab2dc78cf5704ab8185ce', 
          '5c393a8ffb3fd10a87b8904e',
          '5dce3751ae6bb11251e7a869',
          '5bad9df3f3dd61183a0fec96'
        ]
      })
      await chatroom.save()
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
      const myInvite = chatroom.invites.filter(id => String(id) === req.user.id)[0]
      const member = chatroom.members.filter(id => String(id) === req.user.id)[0]
      if(String(chatroom.admin) !== req.user.id && !myInvite && !member) {
        return res.status(401).json({ error: 'You can\'t sit with us' })
      }
      const profile = await Profile.findOne({ user: req.user.id })
      if(req.user.id === myInvite) {
        const index = chatroom.invites.indexOf(myInvite)
        chatroom.invites.splice(index, 1)
        chatroom.members.push(myInvite)
        await chatroom.save()

        const i = profile.chatroomInvites.indexOf(req.params.id)
        profile.chatroomMemberships.push(req.params.id)
        profile.chatroomInvites.splice(i, 1)
        await profile.save()
      }
      return res.json({ chatroom, profile })
    } catch(error) {
      return res.status(400).json({ error })
    }
  }
)

module.exports = router