import React from 'react'

import isEmpty from '../../../validation/is-empty'
import ProfileCreds from '../profile_creds/ProfileCreds'
import ProfilePost from '../profile_post/ProfilePost'
import ProfileIcons from '../profile_assets/ProfileIcons'
import Banners from '../profile_assets/Banners'
import ProfileAbout from '../profile_assets/ProfileAbout'
import './ProfileHeader.css'

export default function ProfileHeader({ profile, user }) {
  return (
    <div className='profile-header-container'>
      <div className="profile-header">
        <div id='header-items'>
          <div id='profile-avatar-div'>
            {isEmpty(user.avatar) ? <p>create profile</p> : <img id='profile-avatar' src={profile.user.avatar} alt="avatar" />}
          </div>
          <ProfileAbout profile={profile} />
          <ProfileIcons profile={profile} />
          <Banners />
        </div>
        <div id='profile-feed'>
          <ProfilePost />
        </div>
        <div id='profile-creds-div'>
          <ProfileCreds venues={profile.venues} />
        </div>
      </div>
    </div>
  )
}