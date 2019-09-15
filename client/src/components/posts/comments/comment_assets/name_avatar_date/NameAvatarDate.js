import React from 'react'
import Moment from 'react-moment'

import PostFeedPopup from '../../../../UI/popup_menu/PostFeedPopup'

import './NameAvatarDate.css'

const NameAvatarDate = ({
  showPopup,
  popupHandler,
  profiles,
  postId,
  comment, 
  userNameOrAvatarClickedLikesPopup, 
  moreVertClicked 
}) => (
  <div className='comment_avatar_name_date' style={{ position: 'relative' }}>
    <img 
      id='comment-feed-avatar' 
      onClick={() => userNameOrAvatarClickedLikesPopup(comment.handle)} 
      src={comment.avatar}
      alt='user avatar' 
    />
    <div id='comment_name_and_date_container'>
      <PostFeedPopup
        comment={comment}
        popupHandler={popupHandler}
        profilesArr={profiles}
        postId={postId}
        showPopup={showPopup}
        userNameOrAvatarClickedLikesPopup={userNameOrAvatarClickedLikesPopup}
      />
      <p id='comment-feed-date'><Moment format='ddd, ll LT'>{comment.date}</Moment></p>
    </div>
    <i className="material-icons post_item_more_vert" onClick={moreVertClicked}>
      more_vert
    </i>
  </div>
)

export default NameAvatarDate