const Post = require('../models/Post'),
  Profile = require('../models/Profile'),
  validatePostInput = require('../validation/post'),
  validateCommentInput = require('../validation/comments')

const postController = {
  // @route         GET api/posts
  // @description   Get posts
  // @access        Public
  async getPosts(req, res) {
    const pageOptions = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10
    }

    try {
      const posts = await Post.find()
        .sort({ date: -1 })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
      return res.status(200).json(posts)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         GET api/posts/search/:search
  // @description   Get posts by hashtag
  // @access        Public
  async getPostsByHashtag(req, res) {
    const pageOptions = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10,
      search: req.params.search
    }
    try {
      const posts = await Post.find({ $or: [
        { text: { $regex: `#${pageOptions.search}`, $options: 'i' } }, 
        { tag: `${pageOptions.search}` }
      ]})
        .sort({ date: -1 })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
      return res.status(200).json(posts)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         GET api/posts/profileposts
  // @desc          Get profile posts
  // @access        Private
  async getPostsByProfile(req, res){
    const pageOptions = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10
    }
    try {
      const posts = await Post.find({ 
        $or: [
          { handle: req.params.handle },
          { text: { $regex: `@${req.params.handle}`, $options: 'i' } } 
        ]
      })
        .sort({ date: -1 })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
      return res.status(200).json(posts)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         GET api/posts/likedposts
  // @desc          Get liked posts
  // @access        Private
  async getLikedPosts(req, res){
    const pageOptions = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10
    }
    try {
      const posts = await Post.find({
        likes: { $elemMatch: { user: req.user.id } }
      })
        .sort({ date: -1 })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
      return res.status(200).json(posts)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         GET api/posts/:id
  // @description   Get post by id
  // @access        Public
  async getPostById(req, res){
    try {
      const post = await Post.findById(req.params.id)
      if (post) return res.status(200).json(post)
    } catch (err) {
      return res.status(404).json({ nopostfound: 'No post found with that ID' })
    }
  },
  // @route         POST api/posts
  // @description   Create post
  // @access        Private
  async createPost(req, res){
    try {
      const { errors, isValid } = validatePostInput(req.body)
      if (!isValid) {
        return res.status(400).json(errors)
      }
      const newPost = new Post({
        text: req.body.text,
        tag: req.body.tag,
        name: req.body.name,
        handle: req.user.handle,
        avatar: req.body.avatar,
        user: req.user.id,
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        media: req.body.media,
      })
      const post = await newPost.save()
      res.status(201).json(post)

      // Provide mentioned users with a notification
      const mentions = req.body.text.match(/@[^\W_]*/g).map(val => val.slice(1))
      const profiles = await Profile.find({ handle: { $in: mentions } })
      profiles.forEach(profile => {
        profile.notifications.push({
          user: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar,
          postImage: post.media,
          postText: post.text,
          postId: post._id,
          post,
          message: `${req.user.name} mentioned you in a post`
        })
        profile.save()
      })
    } catch (err) {
      res.status(400).json(err)
    }
  },
  // @route         PUT api/posts/:id
  // @desc          Edit post
  // @access        Private
  async editPost(req, res){
    const { errors, isValid } = validateCommentInput(req.body)
    if (!isValid) return res.status(400).json(errors)
    try {
      const post = await Post.findById(req.params.id)
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      }
      post.text = req.body.text
      await post.save()
      return res.status(200).json(post)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         DELETE api/posts/:id
  // @description   Delete post
  // @access        Private
  async deletePost(req, res){
    try {
      const post = await Post.findById(req.params.id)
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      }
      post.remove()
      return res.status(200).json({ success: true })
    } catch (err) {
      res.status(404).json({ postnotfound: 'No post found' })
    }
  },
  // @route         POST api/posts/like/:id
  // @description   Like post
  // @access        Private
  async likePost(req, res) {
    try {
      const post = await Post.findById(req.params.id)
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: 'User already liked this post' })
      }
      post.likes.push({
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        handle: req.user.handle
      })
      const savedPost = await post.save()
      // Add user id name and notification message to notification array
      const profile = await Profile.findOne({ user: post.user })
      const message = `${req.user.name} liked your post!`
      profile.notifications.push({
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        postImage: post.media,
        postText: post.text,
        postId: post._id,
        post,
        message
      })
      profile.save()

      return res.status(200).json(savedPost)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         POST api/posts/unlike/:id
  // @description   Unlike post
  // @access        Private
  async unlikePost(req, res){
    const post = await Post.findById(req.params.id)
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res
        .status(400)
        .json({ notliked: 'You have not yet liked this post' })
    }
    try {
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id)
      post.likes.splice(removeIndex, 1)
      const savedPost = await post.save()
      return res.status(200).json(savedPost)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         POST api/posts/comment/:id
  // @description   Add comment to post
  // @access        Private
  async addComment(req, res){
    const { errors, isValid } = validateCommentInput(req.body)
    if (!isValid) return res.status(400).json(errors)
    try {
      const post = await Post.findById(req.params.id)
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
      await post.save()

      // Add to notifications array
      const profile = await Profile.findOne({ user: post.user })
      const message = `${req.user.name} commented on your post!`
      profile.notifications.push({
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        postId: post._id,
        postImage: post.media,
        postText: post.text,
        message
      })
      await profile.save()
      return res.status(201).json(post)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         PUT api/posts/comment/:id/:comment_id
  // @desc          Edit comment
  // @access        Private
  async editComment(req, res){
    const { errors, isValid } = validateCommentInput(req.body)
    if (!isValid) return res.status(400).json(errors)
    try {
      const post = await Post.findById(req.params.id)
      post.comments.forEach(async comment => {
        if (req.user.id !== comment.user.toString()) {
          return res.status(401).json({ notauthorized: 'User not authorized' })
        }
        if (comment._id.toString() === req.params.comment_id) {
          comment.text = req.body.text
          await post.save()
        }
      })
      return res.status(200).json(post)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route         DELETE api/posts/comment/:id/:comment_id
  // @description   Delete a comment from post
  // @access        Private
  async deleteComment(req, res){
    try {
      const post = await Post.findById(req.params.id)
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentdoesntexist: 'Comment does not exist' })
      }
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id)
      post.comments.splice(removeIndex, 1)
      await post.save()
      return res.status(200).json(post)
    } catch (err) {
      res.status(404).json({ postnotfound: 'No post found' })
    }
  },
  // @route POST    api/posts/comment/like/:id/:comment_id
  // description    Add like to comment
  // @access        Private
  likeComment(req, res){
    Post.findById(req.params.id)
      .then(post => {
        post.comments.map(comment => {
          if (comment._id.toString() === req.params.comment_id) {
            if (
              comment.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: 'User already liked this comment' })
            }
            comment.likes.push({
              user: req.user.id,
              name: req.user.name,
              avatar: req.user.avatar,
              handle: req.user.handle
            })

            Profile.findOne({ user: comment.user }).then(profile => {
              const message = `${req.user.name} liked your comment!`
              profile.notifications.push({
                user: req.user.id,
                name: req.user.name,
                avatar: req.user.avatar,
                postId: post._id,
                commentId: comment._id,
                postImage: comment.media,
                postText: comment.text,
                comment,
                message
              })
              profile.save()
            })
          }
        })
        post.save().then(savedPost => res.status(200).json(savedPost))
      })
      .catch(err => res.status(404).json(err))
  },
  // @route           POST api/posts/comment/unlike/:id/:comment_id
  // @sdescription    Unlike comment
  // @access          Private
  unlikeComment(req, res){
    Post.findById(req.params.id)
      .then(post => {
        post.comments.map(comment =>
          // eslint-disable-next-line no-nested-ternary
          comment._id.toString() === req.params.comment_id
            ? comment.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
              ? res
                  .status(400)
                  .json({ notliked: 'You have not yet liked this comment' })
              : comment.likes.splice(
                  comment.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id),
                  1
                )
            : null
        )
        post.save().then(savedPost => res.status(200).json(savedPost))
      })
      .catch(err => res.status(404).json(err))
  },
  // @route POST    api/posts/comment/comment/:id/:comment_id
  // @desc          Add nestedComment to comment
  // @access        Private
  addNestedComment(req, res){
    const { errors, isValid } = validateCommentInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
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

    Post.findById(req.params.id)
      .then(post => {
        post.comments.map(comment => {
          if (comment._id.toString() === req.params.comment_id) {
            comment.comments.unshift(newComment)
            post.save().then(savedPost => res.status(201).json(savedPost))

            // Add to notifications array
            Profile.findOne({ user: comment.user }).then(profile => {
              const message = `${req.user.name} commented on your comment!`
              profile.notifications.push({
                user: req.user.id,
                name: req.user.name,
                avatar: req.user.avatar,
                postId: post._id,
                commentId: comment._id,
                postImage: comment.media,
                postText: comment.text,
                message
              })
              profile.save()
            })
          }
        })
      })
      .catch(err => res.status(404).json(err))
  },
  // @route PUT     api/posts/comment/comment/:id/:comment_id/:nested_comment_id
  // @desc          Edit a nested comment
  // @access        Private
  async editNestedComment(req, res){
    const { errors, isValid } = validateCommentInput(req.body)
    if (!isValid) return res.status(400).json(errors)
    try {
      const post = await Post.findById(req.params.id)
      post.comments.forEach(comment => {
        if (comment._id.toString() === req.params.comment_id) {
          comment.comments.forEach(async nestedComment => {
            if (nestedComment._id.toString() === req.params.nested_comment_id) {
              if (nestedComment.user.toString() !== req.user.id) {
                return res
                  .status(401)
                  .json({ notauthorized: 'User not authorized' })
              }
              nestedComment.text = req.body.text
              await post.save()
            }
          })
        }
      })
      return res.status(200).json(post)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // @route DELETE  api/posts/comment/comment/:id/:comment_id/:nested_comment_id
  // @desc          Delete a nested comment
  // @access        Private
  deleteNestedComment(req, res){
    Post.findById(req.params.id)
      .then(post => {
        post.comments.map(comment =>
          comment._id.toString() === req.params.comment_id
            ? comment.comments.map(nestedComment =>
                nestedComment._id.toString() === req.params.nested_comment_id
                  ? comment.comments.splice(
                      comment.comments
                        .map(val => val._id.toString())
                        .indexOf(req.params.nested_comment_id),
                      1
                    )
                  : null
              )
            : null
        )
        post.save().then(savedPost => res.status(200).json(savedPost))
      })
      .catch(err => res.status(404).json(err))
  },
  // @route POST       api/posts/comment/comment/like/:id/:comment_id/:nested_comment_id
  // @desciption       Add like to nested comment
  // @access           Private
  likeNestedComment(req, res){
    Post.findById(req.params.id)
      .then(post => {
        post.comments.map(comment => {
          if (comment._id.toString() === req.params.comment_id) {
            comment.comments.map(nestedComment => {
              if (
                nestedComment._id.toString() === req.params.nested_comment_id
              ) {
                if (
                  nestedComment.likes.filter(
                    like => like.user.toString() === req.user.id
                  ).length > 0
                ) {
                  return res.status(400).json({
                    alreadyliked: 'User already liked this nested comment'
                  })
                }
                nestedComment.likes.push({
                  user: req.user.id,
                  name: req.user.name,
                  avatar: req.user.avatar,
                  handle: req.user.handle
                })

                // Add to notifications array
                Profile.findOne({ user: nestedComment.user }).then(profile => {
                  const message = `${req.user.name} liked your nestedComment!`
                  profile.notifications.push({
                    user: req.user.id,
                    name: req.user.name,
                    avatar: req.user.avatar,
                    handle: req.user.handle,
                    postId: post._id,
                    commentId: nestedComment._id,
                    postImage: nestedComment.media,
                    postText: nestedComment.text,
                    message
                  })
                  profile.save().then(savedProfile => res.json(savedProfile))
                })
              }
            })
          }
        })
        post.save().then(savedPost => res.status(200).json(savedPost))
      })
      .catch(err => res.status(404).json(err))
  },
  // @route POST       api/posts/comment/comment/unlike/:id/:comment_id/:nested_comment_id
  // @description      Remove like from nested commment
  // @access           Private
  unlikeNestedComment(req, res){
    Post.findById(req.params.id)
      .then(post => {
        post.comments.map(comment => {
          if (comment._id.toString() === req.params.comment_id) {
            comment.comments.map(nestedComment => {
              if (
                nestedComment._id.toString() === req.params.nested_comment_id
              ) {
                if (
                  nestedComment.likes.filter(
                    like => like.user.toString() === req.user.id
                  ).length === 0
                ) {
                  return res.status(400).json({
                    notliked: 'You have not yet liked this nested comment'
                  })
                }
                nestedComment.likes.splice(
                  nestedComment.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id),
                  1
                )
              }
            })
          }
        })
        post.save().then(savedPost => res.status(200).json(savedPost))
      })
      .catch(err => res.status(404).json(err))
  }
}

module.exports = postController