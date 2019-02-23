const router = require('express').Router() 
const mongoose = require('mongoose') 
const passport = require('passport') 

// Post model
const Post = require('../../models/Post')
// Profile model
const Profile = require('../../models/Profile')

// Validation
const validatePostInput = require('../../validation/post')

// @route         GET api/posts/test
// @description   Tests posts route
// @access        Public 
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' })) 


// @route         GET api/posts
// @description   Get posts
// @access        Public
router.get('/', (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page) || 0, 
    limit: parseInt(req.query.limit) || 10

  }

  Post.find()
  .sort({ date: -1 })
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({ nopostsfound: 'No posts found' })) 
})

// @route         GET api/posts/search
// @description   Get posts
// @access        Public
router.get(`/search/:search`, (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page) || 0, 
    limit: parseInt(req.query.limit) || 10,
    search: req.params.search
  }

  Post.find({$text: {$search: pageOptions.search}})
  .sort({ date: -1 })
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({ nopostsfound: 'No posts found' })) 
})



// @route         GET api/posts/:id
// @description   Get post by id
// @access        Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id).then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID'})) 
})


// @route         POST api/posts
// @description   Create post
// @access        Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body) 

  // Check Validation
  if(!isValid) {
    // If errors send 400 with errors object
    return res.status(400).json(errors) 
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    handle: req.body.handle,
    avatar: req.body.avatar,
    user: req.user.id,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    media: req.body.media 
  })

  newPost.save().then(post => res.json(post)) 
})


// @route         DELETE api/posts/:id
// @description   Delete post
// @access        Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      // Check if post owner
      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' }) 
      }

      // DELETE
      post.remove().then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
  })
})


// @route         POST api/posts/like/:id
// @description   Like post
// @access        Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ alreadyliked: 'User already liked this post' })
      }

      // Add user id to likes array
      post.likes.push({ user: req.user.id }) 
      post.save().then(post => res.json(post)) 
    })
    .catch(err => res.status(404).json(err)) 
  })
})


// @route         POST api/posts/unlike/:id
// @description   Unlike post
// @access        Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ notliked: 'You have not yet liked this post' })
      }

      // Get Index
      const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id) 

      // Splice out of array
      post.likes.splice(removeIndex, 1) 
      post.save().then(post => res.json(post)) 
    })
    .catch(err => res.status(404).json(err)) 
  })
})

//////////////////////////////////////////////////       Move this down        ///////////////////////////////////////////////////
// @route           POST api/posts/comment/unlike/:id/:comment_id
// @sdescription    Unlike comment
// @access          Private
router.post('/comment/unlike/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      post.comments.map(comment => comment._id.toString() === req.params.comment_id
        ? comment.likes.filter(like => like.user.toString() === req.user.id).length === 0
        ? res.status(400).json({ notliked: 'You have not yet liked this comment' })
        : comment.likes.splice(comment.likes.map(item => item.user.toString()).indexOf(req.user.id), 1)
        : null
      )
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json(err)) 
  })
})

//////////////////////////////////////////////////        Move this down      /////////////////////////////////////////////////////
// @route POST    api/posts/comment/like/:id/:comment_id
// descriptioin   Add like to comment
// @access        Private
router.post('/comment/like/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      post.comments.map(comment => comment._id.toString() === req.params.comment_id 
        ? comment.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ? res.status(400).json({ alreadyliked: 'User already liked this post' })
        : comment.likes.push({ user: req.user.id })
        :  null
      )
      post.save().then(post => res.json(post)) 
    })
    .catch(err => res.status(404).json(err)) 
  })
})


// @route         POST api/posts/comment/:id
// @description   Add comment to post
// @access        Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body) 

  // Check Validation
  if(!isValid) {
    // If errors send 400 with errors object
    return res.status(400).json(errors) 
  }
  
  Post.findById(req.params.id).then(post => {
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      handle: req.body.handle,
      avatar: req.body.avatar,
      user: req.user.id,
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      media: req.body.media 
    }

    // Add to comments array
    post.comments.unshift(newComment) 
    post.save().then(post => res.json(post)) 
  })
  .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})


// @route         DELETE api/posts/comment/:id/:comment_id
// @description   Delete a comment from post
// @access        Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  Post.findById(req.params.id).then(post => {
    // Check to see if comment exists
    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ commentdoesntexist: 'Comment does not exist' })
    }

    // Get remove index
    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)

    // Splice comment out of array
    post.comments.splice(removeIndex, 1) 
    post.save().then(post => res.json(post)) 
  })
  .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})

module.exports = router  