import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty'
import ProfileCreds from './ProfileCreds'
import ProfilePost from './ProfilePost'
import ProfileIcons from './profile_assets/ProfileIcons'
import './ProfileHeader.css'

class ProfileHeader extends Component {
  render() {
    const { profile, user } = this.props 
    return (
      <div className='profile-header-container'>
        <div className="profile-header">
          <div id='header-items'>
            <div id='profile-avatar-div'>
              {isEmpty(user.avatar) ? <p>create profile</p> : <img id='profile-avatar' src={profile.user.avatar} alt="avatar" />}
            </div>
            <div id='profile-header-about-info'>
              <h4 id='profile-name'>{profile.user.name}</h4>
              {isEmpty(profile.handle) ? null : (<p id='profile-handle'>@{profile.handle}</p>)}
              {isEmpty(profile.bio) ? null : (<p id='profile-bio'>{profile.bio}</p>)}
              {isEmpty(profile.location) ? null : (<p id='profile-location'>{profile.location}</p>)}
            </div>
            <ProfileIcons profile={profile} />
            <div id='reps_banners'>
              <img className='reps_banner_icons' src={require('../../img/pngcopy/mc.png')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/pngcopy/mixer.png')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/pngcopy/mixer2.png')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/pngcopy/onair.png')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/pngcopy/partyrocker.png')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/pngcopy/producer.png')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/pngcopy/remixer2.png')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/pngcopy/turntablist.png')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/pngcopy/vdj.png')} alt='avatar' />
            </div>
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
}

export default ProfileHeader