const router = require('express').Router() 

// @route         GET api/users/test
// @description   Tests users route
// @access        Public 
router.get('/test', (req, res) => res.json({ msg: 'Users Works' })) 

module.exports = router  