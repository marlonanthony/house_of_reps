const router = require('express').Router()
const passport = require('passport')

const Chatroom = require('../../models/Chatroom')

// @route           POST api/chat
// @desc            Create a Chatroom
// @access          Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    try {
      const chatroom = await new Chatroom({
        name: req.body.name && req.body.name,
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
    } catch (err) { console.log(err)}
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
      if(req.user.id === myInvite) {
        const index = chatroom.invites.indexOf(myInvite)
        chatroom.invites.splice(index, 1)
        chatroom.members.push(myInvite)
        await chatroom.save()
      }
      return res.json(chatroom)
    } catch(err) {
      return res.status(400).json(err)
    }
  }
)


module.exports = router