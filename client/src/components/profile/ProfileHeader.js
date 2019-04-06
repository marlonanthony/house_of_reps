import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty'
import ProfileCreds from './ProfileCreds'
import ProfilePost from './ProfilePost'

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
            <div id='profile-icons-container'>
              {isEmpty(profile.website) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.website} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/globe.png')} alt='website avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.social.twitter} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/twit.png')} alt='twitter avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.social.facebook} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/fb3.png')} alt='facebook avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.instagram) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.social.instagram} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/ig2.png')} alt='instagram avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.youtube) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.social.youtube} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/yt2.png')} alt='youtube avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.soundcloud) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.social.soundcloud} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/sc.png')} alt='soundcloud avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.spotify) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.social.spotify} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/spotify.png')} alt='spotify avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.mixcloud) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.social.mixcloud} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/mixcloud.png')} alt='mixcloud avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <a className="" rel='noopener noreferrer' href={profile.social.linkedin} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/linkedin.png')} alt='linkedin avatar' />
                </a>
              )}
            </div>
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