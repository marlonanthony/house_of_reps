const router = require('express').Router()
const {
  confirmEmail,
  reconfirmEmail,
  createUser,
  loginUser,
  updateUserInfo
} = require('../../controllers/user-controller')
const withAuth = require('../../utils/withAuth')

router
.route('/register')
.post(createUser)

router
.route('/confirm')
.post(confirmEmail)

router
.route('/reconfirm-email')
.post(reconfirmEmail)

router
.route('/login')
.post(loginUser)

router
.route('/update')
.put(withAuth, updateUserInfo)

module.exports = router
