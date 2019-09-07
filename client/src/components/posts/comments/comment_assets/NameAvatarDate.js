import React from 'react'
import Moment from 'react-moment'

const NameAvatarDate = ({ userNameOrAvatarClicked, comment }) => (
  <>
    <img 
      id='comment-feed-avatar' 
      onClick={() => userNameOrAvatarClicked(comment.user)} 
      src={comment.avatar}
      alt={comment.avatar} 
    />
    <div id='comment_name_and_date_container'>
      <p className='comment-feed-name' onClick={() => userNameOrAvatarClicked(comment.user)}>
        {comment.name}
      </p>
      <p id='comment-feed-date'><Moment format='ddd, ll LT'>{comment.date}</Moment></p>
    </div>
  </>
)

export default NameAvatarDate