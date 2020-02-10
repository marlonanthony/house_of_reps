import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Popup.css'

const PostFeedPopup = ({ showPopup, setShowPopup, profile, user }) => (
  <div
    className="popup"
    onMouseOver={() => setShowPopup(!showPopup)}
    onMouseOut={() => setShowPopup(!showPopup)}
  >
    <Link to={`/profile/${user.handle}`}>
      <p id="popup-handle">@{user.handle}</p>
    </Link>

    <div className={showPopup ? 'show popupcontent' : 'popupcontent'}>
      <div className="postfeed_popup_profile_info">
        <Link to={`/profile/${user.handle}`}>
          <img
            className="popup-profile-img"
            src={user.avatar}
            alt={user.name}
          />
        </Link>
        <Link to={`/profile/${user.handle}`}>
          <span>{user.name}</span>
        </Link>
        <p className="popup_bio">{profile.bio}</p>
        <a href={profile.website} target="_blank" rel="noopener noreferrer">
          <p>{profile.website && profile.website}</p>
        </a>
      </div>
    </div>
  </div>
)

PostFeedPopup.propTypes = {
  showPopup: PropTypes.bool.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default PostFeedPopup
