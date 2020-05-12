import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  addCommentLike,
  removeCommentLike,
  deleteComment
} from '../../../../actions/postActions'

const CommentButtons = ({
  auth,
  postId,
  comment,
  liked,
  findUserLike,
  toggleForm,
  toggleShowNestedComment,
  addCommentLike,
  removeCommentLike,
  deleteComment
}) => {
  return (
    <div>
      <button
        title="like comment"
        onClick={() => addCommentLike(postId, comment._id, comment)}
        className={
          liked
            ? 'postfeed_buttons liked'
            : classnames('postfeed_buttons', {
                liked: findUserLike(comment.likes)
              })
        }
      >
        <i className="fas fa-thumbs-up icons like"></i>
        {<span>{comment.likes.length}</span>}
      </button>
      <button
        title="unlike"
        className="postfeed_buttons"
        onClick={() => removeCommentLike(postId, comment._id)}
      >
        <i className="fas fa-thumbs-down icons" id="unlike"></i>
      </button>
      <button
        title="show comments"
        onClick={toggleShowNestedComment}
        className="postfeed_buttons"
      >
        <i className="fas fa-comment icons" id="comment" />
        <span>{comment.comments.length}</span>
      </button>
      <button title="reply" onClick={toggleForm} className="postfeed_buttons">
        <i className="fas fa-user-edit icons" id="comment" />
      </button>
      {comment.user === auth.user.id && (
        <button
          title="Delete comment"
          className="postfeed_buttons delete"
          onClick={() => {
            let res = window.confirm(
              'Are you sure you want to delete this comment?'
            )
            if (res) deleteComment(postId, comment._id)
          }}
        >
          <i className="fas fa-times icons" />
        </button>
      )}
    </div>
  )
}

CommentButtons.propTypes = {
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  liked: PropTypes.bool.isRequired,
  findUserLike: PropTypes.func.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  toggleShowNestedComment: PropTypes.func.isRequired
}

export default connect(
  null,
  {
    deleteComment,
    removeCommentLike,
    addCommentLike
  }
)(CommentButtons)
