const router = require('express').Router()
const passport = require('passport')

// Load Validation
const validateProfileInput = require('../../validation/profile')
const validateVenuesInput = require('../../validation/venues')
const validateDjpoolsInput = require('../../validation/djpools')
const validatePerksInput = require('../../validation/djpools')
const validateBrandsInput = require('../../validation/djpools')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

// @route         GET api/profile
// @description   GET current users profile
// @access        Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {}
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      )

      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route         GET api/profile/all
// @description   Get all profiles
// @access        Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {}
      const profiles = await Profile.find().populate('user', ['name', 'avatar'])

      if (!profiles) {
        errors.noprofile = 'No profiles yet'
        return res.status(404).json(errors)
      }
      return res.status(200).json(profiles)
    } catch (err) {
      res.status(404).json({ profile: 'No profiles yet' })
    }
  }
)

// @route         GET api/profile/handle/:handle
// @description   Get profile by handle
// @access        Private
router.get(
  '/handle/:handle',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {}
      const profile = await Profile.findOne({
        handle: req.params.handle
      }).populate('user', ['name', 'avatar'])

      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route     GET api/profile/search/:search
// @desc      Get profiles by handle || stageName
// @access    Public
router.get(
  '/search/:search',
  async (req, res) => {
    try {
      const input = req.params.search.trim()
      const profiles = await Profile.find({
        $or: [
          { handle: { $regex: input, $options: 'i' }},
          { stageName: { $regex: input, $options: 'i' }}
        ]
      }).populate('user', ['name', 'avatar'])
      if(!profiles) return res.status(404).json('These are not the profiles you\'re looking for.')
      return res.status(200).json(profiles)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route         GET api/profile/user/:user_id
// @description   Get profile by user id
// @access        Private
router.get(
  '/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {}
      const profile = await Profile.findOne({
        user: req.params.user_id
      }).populate('user', ['name', 'avatar'])

      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json({ profile: 'There is no profile for this user' })
    }
  }
)

// @route         GET api/profile/notifications
// @description   GET notifications
// @access        Private
router.get(
  '/notifications',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.notifications.forEach((notification, i, array) => {
        if (
          notification.seen &&
          Math.abs(new Date(notification.date) - new Date()) > 604800000
        ) {
          // 1 week
          array.splice(notification[i], 1)
        }
      })
      await profile.save()
      return res.status(200).json(profile.notifications.reverse())
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route            POST api/profile/notifications
// @desc             Set notification to seen once Notifications.js component unMounts
// @access           Private
router.post(
  '/notifications/seen',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
  }
)

// @route         POST api/profile
// @description   Create or edit user profile
// @access        Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    if (!isValid) return res.status(404).json(errors)

    // Get fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.avatar) profileFields.avatar = req.body.avatar
    if (req.body.banner) profileFields.banner = req.body.banner
    if (req.body.handle)
      profileFields.handle = req.body.handle.replace(/\s/g, '')
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website && req.body.website.search(/^http[s]?\:\/\//) === -1) {
      let url = (`http://${req.body.website}`).trim()
      profileFields.website = url
    }
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.venues) profileFields.venues = req.body.venues
    if (req.body.stageName) profileFields.stageName = req.body.stageName.trim()
    if (req.body.style) profileFields.style = req.body.style
    if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber

    // Social
    profileFields.social = {}
    if (req.body.twitter) {
      if(req.body.twitter.search(/^http[s]?\:\/\//) === -1) {
        let url = (`https://${req.body.twitter}`).trim()
        profileFields.social.twitter = url
      } else profileFields.social.twitter = req.body.twitter.trim()
    }
    if (req.body.instagram) {
      if(req.body.instagram.search(/^http[s]?\:\/\//) === -1) {
        let url = (`https://${req.body.instagram}`).trim()
        profileFields.social.instagram = url
      } else profileFields.social.instagram = req.body.instagram.trim()
    }
    if (req.body.facebook) {
      if(req.body.facebook.search(/^http[s]?\:\/\//) === -1) {
        let url = (`https://${req.body.facebook}`).trim()
        profileFields.social.facebook = url
      } else profileFields.social.facebook = req.body.facebook.trim()
    }
    if (req.body.linkedin) {
      if(req.body.linkedin.search(/^http[s]?\:\/\//) === -1) {
        let url = (`https://${req.body.linkedin}`).trim()
        profileFields.social.linkedin = url
      } else profileFields.social.linkedin = req.body.linkedin.trim()
    }
    if (req.body.soundcloud) {
      if(req.body.soundcloud.search(/^http[s]?\:\/\//) === -1) {
        let url = (`https://${req.body.soundcloud}`).trim()
        profileFields.social.soundcloud = url
      } else profileFields.social.soundcloud = req.body.soundcloud.trim()
    }
    if (req.body.spotify) {
      if(req.body.spotify.search(/^http[s]?\:\/\//) === -1) {
        let url = (`https://${req.body.spotify}`).trim()
        profileFields.social.spotify = url
      } else profileFields.social.spotify = req.body.spotify.trim()
    }
    if (req.body.mixcloud) {
      if(req.body.mixcloud.search(/^http[s]?\:\/\//) === -1) {
        let url = (`https://${req.body.mixcloud}`).trim()
        profileFields.social.mixcloud = url
      } else profileFields.social.mixcloud = req.body.mixcloud.trim()
    }
    if (req.body.youtube) {
      if(req.body.youtube.search(/^http[s]?\:\/\//) === -1) {
        let url = (`https://${req.body.youtube}`).trim()
        profileFields.social.youtube = url
      } else profileFields.social.youtube = req.body.youtube.trim()
    }

    Profile.findOne({ user: req.user.id })
      .then(async profile => {
        if (profile) {
          // Update
          // update users avatar
          const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { avatar: req.body.avatar },
            { new: true }
          )
          user.save()
          // update users profile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profileResponse => res.json(profileResponse))
          // update past posts avatar
          const posts = await Post.find({ user: req.user.id })
          posts.forEach(p => {
            p.avatar = req.body.avatar
            p.save()
          })
          // update past posts comments avatar
          const allPosts = await Post.find()
          allPosts.forEach(post => {
            post.comments.forEach(comment => {
              if (String(comment.user) === req.user.id)
                comment.avatar = req.body.avatar
              post.save().catch(err => console.log(err))
            })
          })
        } else {
          // Create
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(
            froundProfile => {
              if (froundProfile) {
                errors.handle = 'That username already exists'
                res.status(400).json(errors)
              }
              new Profile(profileFields)
                .save()
                .then(newProfile => res.status(200).json(newProfile)).catch(err => console.log(err))
            }
          )
        }
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route        POST api/profile/venues
// @description  Add highlight/venue to profile
// @access       Private
router.post(
  '/venues',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
  }
)

// @route        POST api/profile/venues/like
// @description  Like Highlight/venue
// @access       Private
router.post(
  '/venues/like/:id/:userId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
  }
)

// @route        POST api/profile/djpools
// @description  Add a djpool
// @access       Private
router.post(
  '/djpools',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateDjpoolsInput(req.body)
      if (!isValid) {
        return res.status(400).json(errors)
      }
      const profile = await Profile.findOne({ user: req.user.id })
      const newDjpool = {
        image: req.body.image,
        url: req.body.url,
        description: req.body.description
      }
      profile.djpools.unshift(newDjpool)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route        POST api/profile/stores
// @description  Add a certified store
// @access       Private
router.post(
  '/stores',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateDjpoolsInput(req.body)
      if (!isValid) {
        return res.status(400).json(errors)
      }
      const profile = await Profile.findOne({ user: req.user.id })
      const newStore = {
        image: req.body.image,
        url: req.body.url,
        description: req.body.description
      }
      profile.stores.unshift(newStore)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route        POST api/profile/perks
// @description  Add a Perk
// @access       Private
router.post(
  '/perks',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validatePerksInput(req.body)
      if (!isValid) {
        return res.status(400).json(errors)
      }
      const profile = await Profile.findOne({ user: req.user.id })
      const newPerk = {
        image: req.body.image,
        url: req.body.url,
        description: req.body.description
      }
      profile.perks.unshift(newPerk)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route        POST api/profile/brands
// @description  Add a Brand
// @access       Private
router.post(
  '/brands',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateBrandsInput(req.body)
      if (!isValid) {
        return res.status(400).json(errors)
      }
      const profile = await Profile.findOne({ user: req.user.id })
      const newBrand = {
        image: req.body.image,
        url: req.body.url,
        description: req.body.description
      }
      profile.brands.unshift(newBrand)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route        DELETE api/profile/venues/:venue_id
// @description  Delete venue from profile
// @access       Private
router.delete(
  '/venues/:venue_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
  }
)

// @route        DELETE api/profile/djpools/:djpool_id
// @description  Delete djpool
// @access       Private
router.delete(
  '/djpools/:djpool_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      const index = profile.djpools
        .map(item => item.id)
        .indexOf(req.params.djpool_id)
      profile.djpools.splice(index, 1)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route        DELETE api/profile/stores/:store_id
// @description  Delete store
// @access       Private
router.delete(
  '/stores/:store_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      const index = profile.stores
        .map(item => item.id)
        .indexOf(req.params.store_id)
      profile.stores.splice(index, 1)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route        DELETE api/profile/perks/:perk_id
// @description  Delete perk
// @access       Private
router.delete(
  '/perks/:perk_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      const index = profile.perks
        .map(item => item.id)
        .indexOf(req.params.perk_id)
      profile.perks.splice(index, 1)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route        DELETE api/profile/brands/:brand_id
// @description  Delete brand
// @access       Private
router.delete(
  '/brands/:brand_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      const index = profile.brands
        .map(item => item.id)
        .indexOf(req.params.brand_id)
      profile.brands.splice(index, 1)
      await profile.save()
      return res.status(200).json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route        DELETE api/profile
// @description  Delete user and profile
// @access       Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      await Profile.deleteOne({ user: req.user.id })
      await User.deleteOne({ _id: req.user.id })
      await Post.deleteMany({ handle: req.user.handle })
      return res.status(200).json({ success: true })
    } catch (err) {
      res.status(400).json(err)
    }
  }
)

module.exports = router
