import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty'
// import ProfilePost from './ProfilePost'

import './ProfileHeader.css'

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props 

    return (
      <div className='profile-header-container'>
        <div className="profile-header">
          <img id='profile-banner' src={require('../../img/skyline.jpg')} alt='profile-banner' />
          <div className='profile-header-content'>
            <img id='profile-avatar' src={profile.user.avatar} alt="avatar" />
            <div className='profile-post-and-header-items'>
              <div id='header-items'>
                <h4 className='profile-name'>{profile.user.name}</h4>
                {isEmpty(profile.handle) ? null : (<p id='profile-handle'>@{profile.handle}</p>)}
                {isEmpty(profile.bio) ? null : (<p id='profile-bio'>{profile.bio}</p>)}
                {isEmpty(profile.location) ? null : (<p id='profile-location'>{profile.location}</p>)}
                <p id='profile-icons'>
                  {isEmpty(profile.website) ? null : (
                    <a className="" href={profile.website} target='_blank'>
                      <img style={{ width: '35px', height: '35px' }} src={require('../../img/globe.png')} alt='website avatar' />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.twitter) ? null : (
                    <a className="" href={profile.social.twitter} target='_blank'>
                      <img style={{ width: '35px', height: '35px' }} src={require('../../img/twit.png')} alt='twitter avatar' />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <a className="" href={profile.social.facebook} target='_blank'>
                      <img style={{ width: '35px', height: '35px' }} src={require('../../img/fb3.png')} alt='facebook avatar' />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.instagram) ? null : (
                    <a className="" href={profile.social.instagram} target='_blank'>
                      <img style={{ width: '35px', height: '35px' }} src={require('../../img/ig2.png')} alt='instagram avatar' />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.youtube) ? null : (
                    <a className="" href={profile.social.youtube} target='_blank'>
                      <img style={{ width: '35px', height: '35px' }} src={require('../../img/yt2.png')} alt='youtube avatar' />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.soundcloud) ? null : (
                    <a className="" href={profile.social.soundcloud} target='_blank'>
                      <img style={{ width: '35px', height: '35px' }} src={require('../../img/sc.png')} alt='soundcloud avatar' />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.spotify) ? null : (
                    <a className="" href={profile.social.spotify} target='_blank'>
                      <img style={{ width: '35px', height: '35px' }} src={require('../../img/spotify.png')} alt='spotify avatar' />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.mixcloud) ? null : (
                    <a className="" href={profile.social.mixcloud} target='_blank'>
                      <img style={{ width: '35px', height: '35px', borderRadius: '50%' }} src={require('../../img/mixcloud.png')} alt='mixcloud avatar' />
                    </a>
                  )}
                  {isEmpty(profile.social && profile.social.linkedin) ? null : (
                    <a className="" href={profile.social.linkedin} target='_blank'>
                      <img style={{ width: '35px', height: '35px', borderRadius: '50%' }} src={require('../../img/linkedin.png')} alt='linkedin avatar' />
                    </a>
                  )}
                </p>
              </div>
              {/* <div id='profile-post'><ProfilePost /></div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileHeader