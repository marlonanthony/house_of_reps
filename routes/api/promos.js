const router = require('express').Router()
const withAuth = require('../../utils/withAuth')
const { getPromos, createPromo, deletePromo } = require('../../controllers/promo-controller')

// /api/promos

router
.route('/')
.get(getPromos)
.post(withAuth, createPromo)

router
.route('/:id')
.delete(withAuth, deletePromo)

module.exports = router