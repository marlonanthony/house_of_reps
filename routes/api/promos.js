const router = require('express').Router()
const passport = require('passport')
const Promo = require('../../models/Promo')
const validatePromoInput = require('../../validation/djpools')


// @route   POST api/promos/add_promo
// @desc    Add a promo
// @access  Private
router.post(
  '/add_promo',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (!req.user.isAdmin) return res.status(401).json({unauthorized: 'Unauthorized!'})
      const { errors, isValid } = validatePromoInput(req.body)
      if (!isValid) return res.status(400).json(errors)
      const newPromo = new Promo({
        url: req.body.url,
        image: req.body.image,
        description: req.body.description,
        type: req.body.type,
        createdBy: req.user.name
      })
      await newPromo.save()
      return res.status(201).json(newPromo)
    } catch (err) {
      res.status(400).json(err)
    }
  }
)

module.exports = router