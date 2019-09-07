import React from 'react'
import classnames from 'classnames'

export default function CommentButtons({
  auth,
  postId,
  comment,
  liked,
  findUserLike,
  onUnlikeClick,
  onLikeClick,
  onDeleteClick,
  toggleForm,
  toggleShowNestedComment
}) {
  return (
    <div>
      <button 
        title='like comment'
        onClick={() => onLikeClick(postId, comment._id, comment)}
        className={liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
          'liked' : findUserLike(comment.likes)
        })}
        >
        <i className='fas fa-thumbs-up icons like'></i>
        {<span>{comment.likes.length}</span>}
      </button>
      <button 
        title='unlike'
        className='postfeed_buttons'
        onClick={() => onUnlikeClick(postId, comment._id)}>
        <i className="fas fa-thumbs-down icons" id='unlike'></i>
      </button>
      <button 
        title='show comments'
        onClick={toggleShowNestedComment} 
        className='postfeed_buttons'>  
        <i className='fas fa-comment icons' id='comment'/>
        <span>{comment.comments.length}</span>
      </button>
      <button 
        title='reply'
        onClick={toggleForm} 
        className='postfeed_buttons'>  
        <i className='fas fa-user-edit icons' id='comment'/>
      </button>
      { comment.user === auth.user.id && (
        <button 
          title='Delete comment'
          className='postfeed_buttons delete'
          onClick={() => onDeleteClick(postId, comment._id)}>
          <i className="fas fa-times icons" />
        </button> 
      )}
    </div>
  )
}
