import React, { useState } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import PostFeedPopup from '../../../../UI/popup_menu/PostFeedPopup'
import './NameAvatarDate.css'

const NameAvatarDate = ({
  profiles,
  comment,
  userNameOrAvatarClickedLikesPopup,
  moreVertClicked
}) => {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div className="comment_avatar_name_date">
      <img
        id="comment-feed-avatar"
        onClick={() => userNameOrAvatarClickedLikesPopup(comment.handle)}
        src={comment.avatar}
        alt="user avatar"
      />
      <div>
        <PostFeedPopup
          comment={comment}
          setShowPopup={setShowPopup}
          profilesArr={profiles}
          showPopup={showPopup}
          userNameOrAvatarClickedLikesPopup={userNameOrAvatarClickedLikesPopup}
        />
        <p id="comment-feed-date">
          <Moment format="ddd, ll LT">{comment.date}</Moment>
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

NameAvatarDate.propTypes = {
  profiles: PropTypes.array.isRequired,
  comment: PropTypes.object.isRequired,
  userNameOrAvatarClickedLikesPopup: PropTypes.func.isRequired,
  moreVertClicked: PropTypes.func.isRequired
}

export default NameAvatarDate
