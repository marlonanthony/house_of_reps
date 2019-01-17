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
        {/* <img id='profile-banner' src={require('../../img/banner1.jpg')} alt='profile-banner' /> */}
        <div className="profile-header">
          {/* <div id='profile-avatar-div'>
            {isEmpty(user.avatar) ? null : <img id='profile-avatar' src={profile.user.avatar} alt="avatar" />}
          </div> */}
          <div id='header-items'>
            <div id='profile-avatar-div'>
              {isEmpty(user.avatar) ? null : <img id='profile-avatar' src={profile.user.avatar} alt="avatar" />}
            </div>
            <div id='profile-header-about-info'>
              <h4 id='profile-name'>{profile.user.name}</h4>
              {isEmpty(profile.handle) ? null : (<p id='profile-handle'>@{profile.handle}</p>)}
              {isEmpty(profile.bio) ? null : (<p id='profile-bio'>{profile.bio}</p>)}
              {isEmpty(profile.location) ? null : (<p id='profile-location'>{profile.location}</p>)}
            </div>
            <div id='profile-icons-container'>
              {isEmpty(profile.website) ? null : (
                <a className="" href={profile.website} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/globe.png')} alt='website avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <a className="" href={profile.social.twitter} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/twit.png')} alt='twitter avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <a className="" href={profile.social.facebook} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/fb3.png')} alt='facebook avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.instagram) ? null : (
                <a className="" href={profile.social.instagram} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/ig2.png')} alt='instagram avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.youtube) ? null : (
                <a className="" href={profile.social.youtube} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/yt2.png')} alt='youtube avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.soundcloud) ? null : (
                <a className="" href={profile.social.soundcloud} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/sc.png')} alt='soundcloud avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.spotify) ? null : (
                <a className="" href={profile.social.spotify} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/spotify.png')} alt='spotify avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.mixcloud) ? null : (
                <a className="" href={profile.social.mixcloud} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/mixcloud.png')} alt='mixcloud avatar' />
                </a>
              )}
              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <a className="" href={profile.social.linkedin} target='_blank'>
                  <img className='profile-header-icon' src={require('../../img/linkedin.png')} alt='linkedin avatar' />
                </a>
              )}
            </div>
            <div id='reps_banners'>
              {/* <img className='reps_banner_icons' src={require('../../img/fb3.png')} alt='avatar' /> */}
              <img className='reps_banner_icons' src={require('../../img/wremixer.svg')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/wproducer.svg')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/wturntablist.svg')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/wPartyrocker.svg')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/wonair.svg')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/wMixer2.svg')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/vdjw.svg')} alt='avatar' />
              <img className='reps_banner_icons' src={require('../../img/wmc.svg')} alt='avatar' />
            </div>
          </div>
          <div id='profile-feed'>
            {/* { 
              <img src={profile.banner} width={'93%'} height={200} style={{marginLeft: '3.5%'}} alt='profile banner'/> 
            } */}
            <iframe 
              id='youtube-video' 
              title='hofvideo' 
              // width="100%" 
              // height="315px" 
              width='90%'
              height='300'
              src="https://www.youtube.com/embed/qrmKp_ANX_M" 
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              style={{
                marginBottom: '20px',
                // marginTop: '25px' 
              }}
              allowFullScreen>
            </iframe>
            <ProfilePost allProps={this.props.allProps} />
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