import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './ProfileItem.css'

const ProfileItem = ({ profile }) => (
  <div className="profiles_item">
    <img
      src={profile.user.avatar}
      alt={profile.user.name}
      id="profiles_avatar"
    />
    <div className="djs_profile_card">
      <p>{profile.stageName && <span>{profile.stageName}</span>}</p>
      <Link to={`/profile/${profile.handle}`} id="profiles-item-link">
        {profile.handle && <span>@{profile.handle}</span>}
      </Link>
      <p>{profile.bio}</p>
      {profile.venues[0] && profile.venues[0].video && (
        <iframe
          id="reps-card-iframe"
          src={profile.venues[0].video || null}
          title={profile.venues[0].title || null}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        />
      )}
    </div>
  </div>
)

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
