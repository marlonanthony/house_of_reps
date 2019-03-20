import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import CommentItem from './CommentItem'

class CommentFeed extends Component {

  render() {
    const { comments, postId } = this.props 
    return comments.map(comment => (
      <CommentItem 
        key={comment._id} 
        profiles={this.props.profiles} 
        comments={comments} 
        comment={comment} 
        postId={postId} />
      )).reverse()
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
}

export default CommentFeed