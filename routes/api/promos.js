const router = require('express').Router()
const passport = require('passport')
const { getPromos, createPromo, deletePromo } = require('../../controllers/promo-controller')

router
.route('/')
.get(getPromos)
.post(passport.authenticate('jwt', { session: false }), createPromo)

router
.route('/:id')
.delete(passport.authenticate('jwt', { session: false }), deletePromo)

module.exports = router