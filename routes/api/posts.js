const router = require('express').Router()

const withAuth = require('../../utils/withAuth')
const {
  getPosts, 
  getPostsByHashtag,
  getPostsByProfile,
  getLikedPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  editComment,
  deleteComment,
  likeComment,
  unlikeComment,
  addNestedComment,
  editNestedComment,
  deleteNestedComment,
  likeNestedComment,
  unlikeNestedComment
} = require('../../controllers/post-controller')

// /api/posts
router
.route('/likedposts')
.get(withAuth, getLikedPosts)

router
.route('/')
.get(getPosts)
.post(withAuth, createPost)

router
.route('/:id')
.get(getPostById)
.put(withAuth, editPost)
.delete(withAuth, deletePost)

router
.route(`/search/:search`)
.get(getPostsByHashtag)

router
.route('/profileposts/:handle')
.get(withAuth, getPostsByProfile)

router
.route('/like/:id')
.post(withAuth, likePost)

router
.route('/unlike/:id')
.post(withAuth, unlikePost)

router
.route('/comment/:id')
.post(withAuth, addComment)

router
.route('/comment/:id/:comment_id')
.put(withAuth, editComment)
.delete(withAuth, deleteComment)

router
.route('/comment/like/:id/:comment_id')
.post(withAuth, likeComment)

router
.route('/comment/unlike/:id/:comment_id')
.post(withAuth, unlikeComment)

router
.route('/comment/comment/:id/:comment_id')
.post(withAuth, addNestedComment)

router
.route('/comment/comment/:id/:comment_id/:nested_comment_id')
.put(withAuth, editNestedComment)
.delete(withAuth, deleteNestedComment)

router
.route('/comment/comment/like/:id/:comment_id/:nested_comment_id')
.post(withAuth, likeNestedComment)

router
.route('/comment/comment/unlike/:id/:comment_id/:nested_comment_id')
.post(withAuth, unlikeNestedComment)

module.exports = router
