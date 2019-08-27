import React from 'react'
import isEmpty from '../../../validation/is-empty'

export default function ProfileAbout({ profile }) {
  return (
    <div id='profile-header-about-info'>
      <h4 id='profile-name'>{profile.user.name}</h4>
      {isEmpty(profile.handle) ? null : (<p id='profile-handle'>@{profile.handle}</p>)}
      {isEmpty(profile.bio) ? null : (<p id='profile-bio'>{profile.bio}</p>)}
      {isEmpty(profile.location) ? null : (<p id='profile-location'>{profile.location}</p>)}
    </div>
  )
}
