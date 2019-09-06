import React from 'react'
import classnames from 'classnames'

const PostItemButtons = ({
    liked,
    findUserLike,
    onLikeClick,
    onUnlikeClick,
    onDeleteClick,
    onPostCommentClick,
    showActions,
    post,
    likes,
    auth
  }) => {
  return showActions && ( 
    <span>
      <button 
        title='like'
        className={liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
          'liked' : findUserLike(post.likes) 
        })}
        onClick={() => onLikeClick(post._id)}
      >
        <i className='fas fa-thumbs-up icons like'></i>
        <span>{likes.length}</span>
      </button>
      <button 
        title='unlike'
        className='postfeed_buttons'
        onClick={() => onUnlikeClick(post._id)}>
        <i className="fas fa-thumbs-down icons" id='unlike'></i>
      </button>
      <button 
        title='comment'
        onClick={onPostCommentClick} 
        className='postfeed_buttons'>  
        <i className='fas fa-comment icons' id='comment'/>
        <span>{post.comments.length}</span>
      </button>
      { post.user === auth.user.id && 
        <button 
          title='Delete post'
          className='postfeed_buttons delete'
          onClick={() => onDeleteClick(post._id)}>
          <i className="fas fa-times icons" />
        </button> 
      }
    </span>
  )
}

export default PostItemButtons