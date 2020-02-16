import React from 'react'
import PropTypes from 'prop-types'

import PostItem from '../post_item/PostItem'
import './PostFeed.css'

const PostFeed = ({ posts }) => (
  <div className="PostFeed">
    {!posts.length ? (
      <div className="no_post">These are not the posts you're looking for.</div>
    ) : (
      posts.map(post => <PostItem key={post._id} post={post} />)
    )}
  </div>
)

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostFeed
