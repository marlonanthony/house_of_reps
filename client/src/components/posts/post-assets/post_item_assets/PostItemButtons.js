import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const PostItemButtons = ({
    liked,
    findUserLike,
    onLikeClick,
    onUnlikeClick,
    onDeleteClick,
    onPostCommentClick,
    post,
    likes,
    auth,
    toggleShowForm
  }) => {
  return ( 
    <div>
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
      <button 
        title='reply'
        onClick={toggleShowForm} 
        className='postfeed_buttons'>  
        <i className='fas fa-user-edit icons' id='comment'/>
      </button>
      { post.user === auth.user.id && 
        <button 
          title='Delete post'
          className='postfeed_buttons delete'
          onClick={() => onDeleteClick(post._id)}>
          <i className="fas fa-times icons" />
        </button> 
      }
    </div>
  )
}

PostItemButtons.propTypes = {
  liked: PropTypes.bool.isRequired,
  findUserLike: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onUnlikeClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onPostCommentClick: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  likes: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  toggleShowForm: PropTypes.func.isRequired
}

export default PostItemButtons