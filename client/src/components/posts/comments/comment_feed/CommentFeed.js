import React from 'react'
import PropTypes from 'prop-types' 
import CommentItem from '../comment_item/CommentItem'

const CommentFeed = ({ comments, postId, profiles }) => {
  return comments.map(comment => (
    <CommentItem 
      key={comment._id} 
      profiles={profiles} 
      comments={comments} 
      comment={comment} 
      postId={postId} />
    )).reverse()
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
}

export default CommentFeed