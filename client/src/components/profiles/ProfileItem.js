import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validation/is-empty'

import './ProfileItem.css'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props

    return (
      <div className="profile_item">
        <div className="djs_profile_card">
          <img
            src={profile.user.avatar}
            alt={profile.user.name}
            style={{
              borderRadius: '50%',
              height: '100px',
              width: '100px'
            }}
          />
          {/* stageName sounds weird and should probabley be removed */}
          <p>
            {isEmpty(profile.stageName) ? null : (
              <span>{profile.stageName}</span>
            )}
          </p>
          <Link to={`/profile/${profile.handle}`} id="profile-item-link">
            {isEmpty(profile.handle) ? null : <span>@{profile.handle}</span>}
          </Link>
          <p>{profile.bio}</p>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
