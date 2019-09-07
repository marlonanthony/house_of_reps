import React from 'react'
import classnames from 'classnames'

export default function NestedCommentButtons({
  auth,
  postId,
  comment,
  nestedComment,
  liked,
  findUserLike,
  onLikeNestedCommentClick,
  onUnlikeNestedCommentClick,
  onDeleteNestedComment
}) {
  return (
    <div>
      <button
        title='like nested comment'
        onClick={() => onLikeNestedCommentClick(postId, comment._id, nestedComment._id)}
        className={liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
          'liked' : findUserLike(nestedComment.likes)
        })}>
        <i className='fas fa-thumbs-up icons like'></i>
        <span>{ nestedComment.likes.length }</span>
      </button>
      <button
        title='unlike'
        className='postfeed_buttons'
        onClick={() => onUnlikeNestedCommentClick(postId, comment._id, nestedComment._id)}>
        <i className="fas fa-thumbs-down icons" id='unlike'></i>
      </button>
      { nestedComment.user === auth.user.id && (
      <button
        title='delete comment'
        className='postfeed_buttons delete'
        onClick={() => onDeleteNestedComment(postId, comment._id, nestedComment._id)}>
        <i className="fas fa-times icons" />
      </button>
      )}
    </div>
  )
}
