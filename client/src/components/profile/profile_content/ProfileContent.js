import React from 'react'

import ProfileCreds from '../profile_creds/ProfileCreds'
import ProfilePost from '../profile_post/ProfilePost'
import ProfileIcons from '../profile_assets/ProfileIcons'
import Banners from '../profile_assets/Banners'
import ProfileAbout from '../profile_assets/ProfileAbout'
import './ProfileContent.css'

export default function ProfileContent({ profiles, profile, user }) {
  return (
    <div className="profile-content-container">
      <div className="profile-content">
        <div id="header-items">
          <ProfileAbout profile={profile} user={user} />
          <ProfileIcons profile={profile} />
          <Banners />
        </div>
        <ProfilePost profiles={profiles} />
        <ProfileCreds venues={profile.venues} />
      </div>
    </div>
  )
}
