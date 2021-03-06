import React from 'react'
import PropTypes from 'prop-types'
import './Popup.css'

export default function PostFeedPopup(props) {
  const {
    post,
    comment,
    profile,
    profilesArr,
    showPopup,
    setShowPopup,
    popupHandler,
    userNameOrAvatarClickedLikesPopup
  } = props

  let profileInfo

  if (!comment && !profilesArr)
    profileInfo =
      profile.profiles &&
      profile.profiles.map(
        profile =>
          profile._id === post.user && (
            <div className="postfeed_popup_profile_info" key={profile._id}>
              <img
                onClick={() => userNameOrAvatarClickedLikesPopup(post.handle)}
                className="popup-profile-img"
                src={post.avatar}
                alt={post.name}
              />
              <span
                onClick={() => userNameOrAvatarClickedLikesPopup(post.handle)}
              >
                {post.name}
              </span>
              <small className="popup_bio">{profile.bio}</small>
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>website</p>
                </a>
              )}
            </div>
          )
      )
  else
    profileInfo =
      profilesArr &&
      profilesArr.map(
        profile =>
          profile._id === comment.user && (
            <div className="postfeed_popup_profile_info" key={profile._id}>
              <img
                onClick={() =>
                  userNameOrAvatarClickedLikesPopup(comment.handle)
                }
                className="popup-profile-img"
                src={comment.avatar}
                alt={comment.name}
              />
              <span
                onClick={() =>
                  userNameOrAvatarClickedLikesPopup(comment.handle)
                }
              >
                {comment.name}
              </span>
              <small className="popup_bio">{profile.bio}</small>
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>website</p>
                </a>
              )}
            </div>
          )
      )

  return (
    <div
      className="popup"
      onMouseOver={setShowPopup ? () => setShowPopup(!showPopup) : popupHandler}
      onMouseOut={setShowPopup ? () => setShowPopup(!showPopup) : popupHandler}
    >
      <p
        className={!comment ? 'post_name' : 'comment-feed-name'} // post_name is in PostItem.css
        onClick={() =>
          !comment
            ? userNameOrAvatarClickedLikesPopup(post.handle)
            : userNameOrAvatarClickedLikesPopup(comment.handle)
        }
      >
        {!comment ? post.name : comment.name}
      </p>
      <div className={showPopup ? 'show popupcontent' : 'popupcontent'}>
        {profileInfo && profileInfo}
      </div>
    </div>
  )
}

PostFeedPopup.propTypes = {
  post: PropTypes.object,
  comment: PropTypes.object,
  profile: PropTypes.object,
  profilesArr: PropTypes.array,
  showPopup: PropTypes.bool,
  setShowPopup: PropTypes.func,
  popupHandler: PropTypes.func,
  userNameOrAvatarClickedLikesPopup: PropTypes.func.isRequired
}
