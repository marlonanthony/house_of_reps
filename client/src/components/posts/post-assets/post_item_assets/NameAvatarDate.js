import React from 'react'
import Moment from 'react-moment'

import PostFeedPopup from '../../../UI/popup_menu/PostFeedPopup'

export default function NameAvatarDate({
  popupHandler,
  profile,
  post,
  showPopup,
  userNameOrAvatarClicked
}) {
  return (
    <div className='post_avatar_and_name'>
      <img className='post_avatar_img' onClick={()=> userNameOrAvatarClicked(post.user)} src={post.avatar} alt={post.name} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PostFeedPopup
          popupHandler={popupHandler}
          profile={profile}
          post={post}
          showPopup={showPopup}
          userNameOrAvatarClicked={userNameOrAvatarClicked}
        />
        <p className='post_feed_date'><Moment format='ddd, ll LT'>{post.date}</Moment></p>
      </div>
    </div>
  )
}
