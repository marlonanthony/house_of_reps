import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './ProfileItem.css'

const ProfileItem = ({ profile }) => {
  const [showMore, setShowMore] = useState(false)
  return (
    <div className="profiles_item">
      <img src={profile.avatar} alt={profile.name} id="profiles_avatar" />
      <div className="djs_profile_card">
        {profile.stageName && <p id="reps-stage-name">{profile.stageName}</p>}
        {profile.handle && (
          <Link to={`/profile/${profile.handle}`} id="profiles-item-link">
            @{profile.handle}
          </Link>
        )}
        {profile.bio && profile.bio.length >= 125 ? (
          showMore ? (
            <p id="reps-page-bio" onClick={() => setShowMore(prev => !prev)}>
              {profile.bio}
              <span id="showless-reps-bio">say less</span>
            </p>
          ) : (
            <p id="reps-page-bio" onClick={() => setShowMore(prev => !prev)}>
              {profile.bio.slice(0, 125)}...
              <span id="showmore-reps-bio">show more</span>
            </p>
          )
        ) : (
          <p id="reps-page-bio">{profile.bio}</p>
        )}
        {profile.venues && profile.venues.length > 1
          ? profile.venues[0] &&
            profile.venues[0].video && (
              <iframe
                id="reps-card-iframe"
                src={profile.venues[0].video}
                title={profile.venues[0].title || null}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              />
            )
          : profile.venues &&
            profile.venues.video && (
              <iframe
                id="reps-card-iframe"
                src={profile.venues.video}
                title={profile.venues.title || null}
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
