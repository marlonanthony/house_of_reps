import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import isEmpty from '../../validation/is-empty' 

class ProfileAbout extends Component {

  render() {
    const { profile } = this.props 

    // Get first name 
    const firstName = profile.user.name.trim().split(' ')[0] 

    return (
      <div>
        <h3>{firstName}'s Bio</h3>
        <p>
          {isEmpty(profile.bio) ? (<span>{firstName} does not have a bio yet</span>) : (<span>{profile.bio}</span>)}
        </p>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout