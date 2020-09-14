const jwt = require('jsonwebtoken')

const User = require('../models/User'),
  Post = require('../models/Post'),
  Profile = require('../models/Profile'),
  validateVenuesInput = require('../validation/venues'),
  validateProfileInput = require('../validation/profile'),
  getProfileFields = require('../utils/profile_fields'),
  keys = require('../config/keys')

const profileController = {
  // @route         GET api/profile
  // @description   GET current users profile
  // @access        Private
  async getMyProfile(req, res){
    try {
      const errors = {}
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar', 'email']
      )

      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         GET api/profile/all
  // @description   Get all profiles
  // @access        Private
  async getAllProfiles(req, res){
    try {
      const errors = {}
      const profiles = await Profile.find().populate('user', ['name', 'avatar', 'email'])

      if (profiles && !profiles.length) {
        errors.noprofile = 'No profiles yet'
        return res.status(404).json(errors)
      }

      const returnedProfiles = profiles && profiles.map(profile => {
        return {
          _id: profile.user._id,
          avatar: profile.user.avatar,
          name: profile.user.name,
          email: profile.user.email,
          stageName: profile.stageName,
          handle: profile.handle,
          bio: profile.bio,
          website: profile.website,
          venues: profile.venues && profile.venues
        }
      })

      return res.status(200).json(returnedProfiles)
    } catch (err) {
      res.status(404).json({ profile: 'No profiles yet' })
    }
  },
  // @route         GET api/profile/handle/:handle
  // @description   Get profile by handle
  // @access        Private
  async getProfileByHandle(req, res){
    try {
      const errors = {}
      const profile = await Profile.findOne({
        handle: req.params.handle
      }).populate('user', ['name', 'avatar', 'email'])

      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route     GET api/profile/search/:search
  // @desc      Get profiles by handle || stageName || location(?)
  // @access    Public
  async searchPostsByHandleLocationStageName(req, res){
    try {
      const input = req.params.search.trim()
      const profiles = await Profile.find({
        $or: [
          { handle: { $regex: input, $options: 'i' }},
          { stageName: { $regex: input, $options: 'i' }},
          { location: { $regex: input, $options: 'i' }}
        ]
      }).populate('user', ['name', 'avatar', 'email'])
      const returnedProfiles = profiles && profiles.map(profile => {
        return {
          avatar: profile.user.avatar,
          name: profile.user.name,
          stageName: profile.stageName,
          handle: profile.handle,
          bio: profile.bio,
          venues: profile.venues && profile.venues[0]
        }
      })
      return res.status(200).json(returnedProfiles)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         GET api/profile/user/:user_id
  // @description   Get profile by user id
  // @access        Private
  async getProfileByUserId(req, res){
    try {
      const errors = {}
      const profile = await Profile.findOne({
        user: req.params.user_id
      }).populate('user', ['name', 'avatar', 'email'])

      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json({ profile: 'There is no profile for this user' })
    }
  },
  // @route         GET api/profile/notifications
  // @description   GET notifications
  // @access        Private
  async getNotifications(req, res){
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.notifications.forEach((notification, i, array) => {
        if (
          notification.seen &&
          Math.abs(new Date(notification.date) - new Date()) > 2592000000
          // Delete notification if seen and > one month
        ) {
          array.splice(notification[i], 1)
        }
      })
      await profile.save()
      return res.status(200).json(profile.notifications.reverse())
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route            POST api/profile/notifications
  // @desc             Set notification to seen once Notifications.js component unMounts
  // @access           Private
  async seenNotification(req, res){
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.notifications.forEach(notification => {
        notification.seen = true
      })
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         POST api/profile
  // @description   Create or edit user profile
  // @access        Private
  async createOrEditProfile(req, res){
    try {
      const { errors, isValid } = validateProfileInput(req.body)
      if (!isValid) return res.status(404).json(errors)
      const profileFields = getProfileFields(req)

      const profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        // Update
        // update users avatar and handle
        const user = await User.findOneAndUpdate(
          { _id: req.user.id },
          { avatar: profileFields.avatar, handle: profileFields.handle },
          { new: true }
        )
        await user.save()
        // update past posts avatar and handle
        await Post.updateMany(
          { user: req.user.id }, 
          { avatar: profileFields.avatar, handle: profileFields.handle }
        )
        // update past posts comments avatar and handle
        const allPosts = await Post.find()
        allPosts.forEach(async post => {
          post.comments.forEach(comment => {
            if (String(comment.user) === req.user.id)
              comment.avatar = profileFields.avatar
              comment.handle = profileFields.handle
          })
          await post.save()
        })
        // update users profile
        await Profile.updateOne(
          { user: req.user.id },
          { $set: profileFields }
        )

        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          handle: user.handle,
          isAdmin: user.isAdmin
        }
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 10800 },
          (err, token) => {
              return res.status(200).json({ token: `Bearer ${token}` })
          }
        )
      } else {
        // Create
        const newProfile = await new Profile(profileFields)
        await newProfile.save()
        return res.status(200).json(newProfile)
      }
    } catch(err){ return res.status(404).json(err) }
  },
  // @route        POST api/profile/venues
  // @description  Add highlight/venue to profile
  // @access       Private
  async addHighlight(req, res){
    try {
      const { errors, isValid } = validateVenuesInput(req.body)

      if (!isValid) {
        return res.status(400).json(errors)
      }

      const profile = await Profile.findOne({ user: req.user.id })
      const newVenue = {
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
        description: req.body.description,
        video: req.body.video,
        image: req.body.image,
        user: req.user.id
      }

      // Add to venues array
      profile.venues.unshift(newVenue)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route        POST api/profile/venues/like/:id/:userId
  // @description  Like Highlight/venue
  // @access       Private
  async likeHighlight(req, res){
    try {
      const profile = await Profile.findOne({ user: req.params.userId })
      const newLike = {
        user: req.user.id,
        avatar: req.user.avatar,
        name: req.user.name
      }

      profile.venues.forEach(venue => {
        if (venue._id.toString() === req.params.id) {
          if (
            venue.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this highlight' })
          }
          venue.likes.push(newLike)
          const message = `${req.user.name} liked your highlight!`
          profile.notifications.push({
            user: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar,
            highlight: venue,
            message
          })
        }
      })

      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route        DELETE api/profile/venues/:venue_id
  // @description  Delete venue from profile
  // @access       Private
  async deleteHighlight(req, res){
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      const index = profile.venues
        .map(item => item.id)
        .indexOf(req.params.venue_id)
      profile.venues.splice(index, 1)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route        DELETE api/profile
  // @description  Delete user and profile
  // @access       Private
  async deleteAccount(req, res){
    try {
      await Profile.deleteOne({ user: req.user.id })
      await User.deleteOne({ _id: req.user.id })
      await Post.deleteMany({ handle: req.user.handle })
      return res.status(200).json({ success: true })
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

module.exports = profileController