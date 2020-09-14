const Chatroom = require('../models/Chatroom'),
  Profile = require('../models/Profile')

const chatroomController = {
  // @route           POST api/chat
  // @desc            Create a Chatroom
  // @access          Private
  async createChatroom(req, res){
    const {name, invites, moderators} = req.body
    const invitesAndMods = [...invites, ...moderators]
    const arr = invitesAndMods.filter((person, index, arr) => 
      index === arr.findIndex(t => 
        t.id === person.id 
    ))
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      const chatroom = await new Chatroom({
        name: name && name.trim(),
        admin: { id: req.user.id, handle: req.user.handle, name: req.user.name },
        invites: arr,
        moderators,
        members: [{
          id: req.user.id, 
          name: req.user.name, 
          handle: req.user.handle
        }]
      })
      await chatroom.save()
      const invitesList = []
      invites.forEach(val => { invitesList.push(val.id) })
      moderators.forEach(val => { invitesList.push(val.id) })
      await Profile.updateMany({ user: { $in: invitesList}},
        {$push: { chatroomInvites: { name, id: chatroom._id }}})
      // add to notifications
      const message = `${req.user.name} invited you to join a chatroom!`
      await Profile.updateMany({ user: { $in: invitesList }},
        {$push: { notifications: {
          user: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar,
          chatroomId: chatroom._id,
          chatroomName: name && name.trim(),
          message
        }}})
      profile.chatroomMemberships.push({name, id: chatroom._id})
      await profile.save()
      return res.status(201).json({chatroom, profile})
    } catch (error) { return res.status(400).json({ error }) }
  },
  // @route         GET api/chat/:id
  // @desc          Get chatroom by id
  // @access        Private
  async getChatroomById(req, res){
    try {
      const chatroom = await Chatroom.findById(req.params.id)
      if(!chatroom) return res.status(404).json({ error: 'Chatroom not found' })
      const myInvite = chatroom.invites.filter(person => String(person.id) === req.user.id)[0]
      const member = chatroom.members.filter(person => String(person.id) === req.user.id)[0]
      const mod = chatroom.moderators.filter(person => String(person.id) === req.user.id)[0]
      if(String(chatroom.admin.id) !== req.user.id && !myInvite && !member && !mod) {
        return res.status(401).json({ error: 'You can\'t sit with us' })
      }
      return res.status(200).json(chatroom)
    } catch(error) {
      return res.status(400).json({ error })
    }
  },
  // @route         POST api/chat/accept/:id
  // @desc          Accept chatroom invite
  // @access        Private
  async acceptChatroomInvite(req, res) {
    try {
      const chatroom = await Chatroom.findById(req.params.id)
      if(!chatroom) return res.status(404).json({ error: 'Chatroom not found' })
      const myInvite = chatroom.invites.filter(person => String(person.id) === req.user.id)[0]
      if(!myInvite || req.user.id !== String(myInvite.id)) return res.status(401).json({ error: 'You can\'t sit with us' })
      // remove invite and add member to chatroom
      const index = chatroom.invites
      .map((obj, i) => String(obj.id) === req.user.id && i)
      .filter(val => val)[0]
      chatroom.invites.splice(index, 1)
      chatroom.members.push(myInvite)
      await chatroom.save()
      // notify chatroom admin that a user accepted invite
      const admin = await Profile.findOne({ user: chatroom.admin.id})
      admin.notifications.push({
        avatar: req.user.avatar,
        name: req.user.name,
        chatroomId: chatroom._id,
        chatroomName: chatroom.name && chatroom.name.trim(),
        message: `${req.user.name} accepted your invite to chatroom ${chatroom.name && chatroom.name}!`
      })
      await admin.save()
      // place chatroom in users profile
      const profile = await Profile.findOne({ user: req.user.id })
      profile.chatroomMemberships.push({ name: chatroom.name, id: req.params.id })
      chatroom.moderators.map(mod => {
        if(String(mod.id) === req.user.id){
          profile.chatroomMemberships.forEach(mem => {
            mem.moderator = true
          })
        }
      })
      const i = profile.chatroomInvites.indexOf(req.params.id)
      profile.chatroomInvites.splice(i, 1)
      await profile.save()
      return res.status(200).json({chatroom, profile})
    } catch (err) {
      return res.status(400).json(err)
    }
  },
  // @route         PUT api/chat/add_members/:id
  // @desc          Add people to chatroom
  // @access        Private
  async inviteToChatroom(req, res){
    try {
      const chatroom = await Chatroom.findById(req.params.id)
      const mods = chatroom.moderators.filter(mod => String(mod.id) === req.user.id)[0]
      
      if(String(chatroom.admin.id) !== req.user.id && !mods){
        return res.status(401).json({ error: 'Unauthorized' })
      }

      if(req.body) {
        // remove duplicates if any in req.body array
        const arr = req.body.filter((person, index, array) => 
          index === array.findIndex(t => 
            t.id === person.id 
        ))
        arr.forEach(invite => {
          const member = chatroom.members.filter(mem => String(mem.id) === invite.id)[0]
          const invited = chatroom.invites.filter(i => String(i.id) === invite.id)[0]

          if(!member && !invited) {
            chatroom.invites.push({
              id: invite.id,
              name: invite.name,
              handle: invite.handle
            })
          }
        })
        // Add invite to users profile
        const invitesList = []
        arr.forEach(val => { invitesList.push(val.id) })
        // compare invitesList to chatroomInvitesstyles
        // figure out how to add multiple filters to updateMany
        await Profile.updateMany({ user: { $in: invitesList}},
          {$push: { chatroomInvites: { name: chatroom.name.trim(), id: chatroom._id }}})
        // Notify users that they've been invited to chatroom
        const message = `${req.user.name} invited you to join a chatroom!`
        await Profile.updateMany({ user: { $in: invitesList }},
          {$push: { notifications: {
            user: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar,
            chatroomId: chatroom._id,
            chatroomName: chatroom.name && chatroom.name.trim(),
            message
          }}})
      }
      await chatroom.save()
      return res.status(200).json({ chatroom })
    } catch(err){
      return res.status(401).json(err)
    }
  },
  // @route         DELETE api/chat/:id
  // @desc          Delete chatroom
  // @access        Private
  async deleteChatroom(req, res) {
    try {
      await Profile.updateMany({}, {$pull: { chatroomInvites: { id: req.params.id }}})
      await Profile.updateMany({}, {$pull: { chatroomMemberships: { id: req.params.id }}})
      const chatroom = await Chatroom.findById(req.params.id)
      chatroom.remove()
      const profile = await Profile.findOne({ user: req.user.id })
      return res.status(200).json(profile)
    } catch (err){
      return res.status(400).json(err)
    }
  },
  // @route        DELETE api/chat/profile/:chatId
  // @desc         Leave Chatroom
  // @access       Private
  async leaveChatroom(req, res) {
    try {
      await Profile.updateOne(
        { user: req.user.id }, 
        {$pull: { chatroomMemberships: { id: req.params.chatId }}}
      )
      await Chatroom.updateOne(
        {_id: req.params.chatId},
        {$pull: { members: { id: req.user.id } }}
      )
      await Chatroom.updateOne(
        {_id: req.params.chatId},
        {$pull: { moderators: { id: req.user.id}}}
      )
      const profile = await Profile.findOne({ user: req.user.id })
      return res.status(200).json({ profile })
    } catch (err){
      return res.status(400).json(err)
    }
  }
}

module.exports = chatroomController