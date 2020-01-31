import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './ProfileItem.css'

const ProfileItem = ({ profile }) => {
  const [showMore, setShowMore] = useState(false)
  return (
    <div className="profiles_item">
      <img
        src={profile.user.avatar}
        alt={profile.user.name}
        id="profiles_avatar"
      />
      <div className="djs_profile_card">
        {profile.stageName && <p id="reps-stage-name">{profile.stageName}</p>}
        {profile.handle && (
          <Link to={`/profile/${profile.handle}`} id="profiles-item-link">
            @{profile.handle}
          </Link>
        )}
        {profile.bio && profile.bio.length >= 135 ? (
          showMore ? (
            <p id="reps-page-bio">
              {profile.bio}
              <span
                id="showless-reps-bio"
                onClick={() => setShowMore(prev => !prev)}
              >
                say less
              </span>
            </p>
          ) : (
            <p id="reps-page-bio">
              {profile.bio.slice(0, 135)}...
              <span
                id="showmore-reps-bio"
                onClick={() => setShowMore(prev => !prev)}
              >
                show more
              </span>
            </p>
          )
        ) : (
          <p id="reps-page-bio">{profile.bio}</p>
        )}
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
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
