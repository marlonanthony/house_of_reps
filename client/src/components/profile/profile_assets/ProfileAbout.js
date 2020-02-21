import React from 'react'
import isEmpty from '../../../utils/is_empty/is-empty'

const ProfileAbout = ({ profile }) => (
  <div className="profile_page_avatar_bio_wrapper">
    <div id="profile-avatar-div">
      {isEmpty(profile) ? (
        <p>create profile</p>
      ) : (
        <img
          id="profile-avatar"
          src={
            profile &&
            profile.user &&
            profile.user.avatar &&
            profile.user.avatar
          }
          alt="avatar"
        />
      )}
    </div>
    <div id="profile-header-about-info">
      <h4 id="profile-name">
        {profile && profile.user && profile.user.name && profile.user.name}
      </h4>
      {!isEmpty(profile.handle) && <p id="profile-handle">@{profile.handle}</p>}
      {!isEmpty(profile.bio) && <p id="profile-bio">{profile.bio}</p>}
      {!isEmpty(profile.location) && (
        <p id="profile-location">{profile.location}</p>
      )}
    </div>
  </div>
)

export default ProfileAbout
