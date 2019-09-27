import React from 'react'
import isEmpty from '../../../validation/is-empty'

const ProfileAbout = ({ profile, user }) => (
  <>
    <div id='profile-avatar-div'>
      { isEmpty(user.avatar) 
        ? <p>create profile</p> 
        : <img id='profile-avatar' src={profile.user.avatar} alt="avatar" /> 
      }
    </div>
    <div id='profile-header-about-info'>
      <h4 id='profile-name'>{profile.user.name}</h4>
      {!isEmpty(profile.handle) && <p id='profile-handle'>@{profile.handle}</p>}
      {!isEmpty(profile.bio) && <p id='profile-bio'>{profile.bio}</p>}
      {!isEmpty(profile.location) && <p id='profile-location'>{profile.location}</p>}
    </div>
  </>
)

export default ProfileAbout