import React from 'react'
import isEmpty from '../../../validation/is-empty'

const ProfileIcons = ({ profile }) => (
  <div id='profile-icons-container'>
    {isEmpty(profile.website) ? null : (
      <a rel='noopener noreferrer' href={profile.website} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/globe.png')} alt='website avatar' />
      </a>
    )}
    {isEmpty(profile.social && profile.social.twitter) ? null : (
      <a rel='noopener noreferrer' href={profile.social.twitter} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/twit.png')} alt='twitter avatar' />
      </a>
    )}
    {isEmpty(profile.social && profile.social.facebook) ? null : (
      <a rel='noopener noreferrer' href={profile.social.facebook} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/fb3.png')} alt='facebook avatar' />
      </a>
    )}
    {isEmpty(profile.social && profile.social.instagram) ? null : (
      <a rel='noopener noreferrer' href={profile.social.instagram} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/ig2.png')} alt='instagram avatar' />
      </a>
    )}
    {isEmpty(profile.social && profile.social.youtube) ? null : (
      <a rel='noopener noreferrer' href={profile.social.youtube} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/yt2.png')} alt='youtube avatar' />
      </a>
    )}
    {isEmpty(profile.social && profile.social.soundcloud) ? null : (
      <a rel='noopener noreferrer' href={profile.social.soundcloud} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/sc.png')} alt='soundcloud avatar' />
      </a>
    )}
    {isEmpty(profile.social && profile.social.spotify) ? null : (
      <a rel='noopener noreferrer' href={profile.social.spotify} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/spotify.png')} alt='spotify avatar' />
      </a>
    )}
    {isEmpty(profile.social && profile.social.mixcloud) ? null : (
      <a rel='noopener noreferrer' href={profile.social.mixcloud} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/mixcloud.png')} alt='mixcloud avatar' />
      </a>
    )}
    {isEmpty(profile.social && profile.social.linkedin) ? null : (
      <a rel='noopener noreferrer' href={profile.social.linkedin} target='_blank'>
        <img className='profile-header-icon' src={require('../../../img/linkedin.png')} alt='linkedin avatar' />
      </a>
    )}
  </div>
)

export default ProfileIcons