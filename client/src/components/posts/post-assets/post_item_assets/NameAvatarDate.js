import React from 'react'
import Moment from 'react-moment'

import PostFeedPopup from '../../../UI/popup_menu/PostFeedPopup'

export default function NameAvatarDate({
  moreVertClicked,
  popupHandler,
  profile,
  post,
  showPopup,
  userNameOrAvatarClickedLikesPopup
}) {
  return (
    <div className="post_avatar_and_name">
      <img
        className="post_avatar_img"
        onClick={() => userNameOrAvatarClickedLikesPopup(post.handle)}
        src={post.avatar}
        alt={post.name}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PostFeedPopup
          popupHandler={popupHandler}
          profile={profile}
          post={post}
          showPopup={showPopup}
          userNameOrAvatarClickedLikesPopup={userNameOrAvatarClickedLikesPopup}
        />
        <p className="post_feed_date">
          <Moment format="ddd, ll LT">{post.date}</Moment>
        </p>
      </div>
      <i
        className="material-icons post_item_more_vert"
        onClick={moreVertClicked}
      >
        more_vert
      </i>
    </div>
  )
}
