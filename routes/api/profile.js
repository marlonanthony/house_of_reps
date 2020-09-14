const router = require('express').Router()
const withAuth = require('../../utils/withAuth')
const {
  getMyProfile,
  getAllProfiles,
  getProfileByHandle,
  searchPostsByHandleLocationStageName,
  getProfileByUserId,
  getNotifications,
  seenNotification,
  createOrEditProfile,
  addHighlight,
  likeHighlight,
  deleteHighlight,
  deleteAccount
} = require('../../controllers/profile-controller')

// /api/profile

router
.route('/')
.get(withAuth, getMyProfile)
.post(withAuth, createOrEditProfile)
.delete(withAuth, deleteAccount)

router
.route('/all')
.get(withAuth, getAllProfiles)

router
.route('/handle/:handle')
.get(withAuth, getProfileByHandle)

router
.route('/search/:search')
.get(withAuth, searchPostsByHandleLocationStageName)

router
.route('/user/:user_id')
.get(withAuth, getProfileByUserId)

router
.route('/notifications')
.get(withAuth, getNotifications)

router
.route('/notifications/seen')
.post(withAuth, seenNotification)

router
.route('/venues')
.post(withAuth, addHighlight)

router
.route('/venues/:venue_id')
.delete(withAuth, deleteHighlight)

router
.route('/venues/like/:id/:userId')
.post(withAuth, likeHighlight)

module.exports = router
