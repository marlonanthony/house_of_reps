import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { 
  likeNestedComment,
  unlikeNestedComment,
  deleteNestedComment
} from '../../../../../actions/postActions'

const NestedCommentButtons = ({
  auth,
  postId,
  comment,
  nestedComment,
  liked,
  findUserLike,
  likeNestedComment,
  unlikeNestedComment,
  deleteNestedComment
}) => {
  return (
    <div>
      <button
        title='like nested comment'
        onClick={() => likeNestedComment(postId, comment._id, nestedComment._id)}
        className={liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
          'liked' : findUserLike(nestedComment.likes)
        })}>
        <i className='fas fa-thumbs-up icons like'></i>
        <span>{ nestedComment.likes.length }</span>
      </button>
      <button
        title='unlike'
        className='postfeed_buttons'
        onClick={() => unlikeNestedComment(postId, comment._id, nestedComment._id)}>
        <i className="fas fa-thumbs-down icons" id='unlike'></i>
      </button>
      { nestedComment.user === auth.user.id && (
        <button
          title='delete comment'
          className='postfeed_buttons delete'
          onClick={() => deleteNestedComment(postId, comment._id, nestedComment._id)}>
          <i className="fas fa-times icons" />
        </button>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  errors: state.errors
})

NestedCommentButtons.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  nestedComment: PropTypes.object.isRequired,
  liked: PropTypes.bool.isRequired,
  findUserLike: PropTypes.func.isRequired,
  likeNestedComment: PropTypes.func.isRequired,
  unlikeNestedComment: PropTypes.func.isRequired,
  deleteNestedComment: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { 
  likeNestedComment,
  unlikeNestedComment,
  deleteNestedComment
})(NestedCommentButtons)