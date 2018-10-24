import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty'
import ProfileCreds from './ProfileCreds'
// import ProfilePost from './ProfilePost'

import './ProfileHeader.css'

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props 

    return (
      <div className='profile-header-container'>
        <img id='profile-banner' src={require('../../img/skyline.jpg')} alt='profile-banner' />
        <div className="profile-header">
          <div id='profile-avatar-div'>
          {isEmpty(profile.avatar) ? null : <img id='profile-avatar' src={profile.avatar} alt="avatar" />}
          </div>
            <div id='header-items'>
              <h4 className='profile-name'>{profile.user.name}</h4>
              {isEmpty(profile.handle) ? null : (<p id='profile-handle'>@{profile.handle}</p>)}
              {isEmpty(profile.bio) ? null : (<p id='profile-bio'>{profile.bio}</p>)}
              {isEmpty(profile.location) ? null : (<p id='profile-location'>{profile.location}</p>)}
              <p id='profile-icons-container'>
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
              </p>
            {/* <div id='profile-post'><ProfilePost /></div> */}
          </div>
          <div id='profile-feed'>
          <iframe id='youtube-video' title='hofvideo' width="100%" height="315" src="https://www.youtube.com/embed/qrmKp_ANX_M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <h1>News Feed</h1>
            <p style={{ textAlign: 'start'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nunc faucibus a pellentesque sit amet porttitor. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Quis risus sed vulputate odio ut enim blandit volutpat. Eu lobortis elementum nibh tellus. Nunc non blandit massa enim. Non consectetur a erat nam at lectus. Egestas erat imperdiet sed euismod nisi porta. Lobortis mattis aliquam faucibus purus in massa tempor nec. Aenean sed adipiscing diam donec. Euismod in pellentesque massa placerat. Turpis nunc eget lorem dolor sed. Maecenas accumsan lacus vel facilisis volutpat est. Integer feugiat scelerisque varius morbi enim nunc faucibus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Id aliquet risus feugiat in ante. Semper quis lectus nulla at volutpat diam ut venenatis.

Nisi porta lorem mollis aliquam ut. Ac turpis egestas integer eget aliquet. Nisi lacus sed viverra tellus in hac habitasse platea. Nibh mauris cursus mattis molestie a iaculis at erat. Phasellus vestibulum lorem sed risus ultricies. Arcu odio ut sem nulla. Urna id volutpat lacus laoreet non. Aliquet sagittis id consectetur purus ut. Non sodales neque sodales ut etiam sit amet nisl purus. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Purus ut faucibus pulvinar elementum integer enim neque volutpat ac. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Nisi porta lorem mollis aliquam ut porttitor.

Vulputate eu scelerisque felis imperdiet. Bibendum at varius vel pharetra vel turpis. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Habitant morbi tristique senectus et netus et malesuada. Neque aliquam vestibulum morbi blandit cursus. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Pharetra pharetra massa massa ultricies mi quis. Nisi lacus sed viverra tellus in. Eget sit amet tellus cras. Elit sed vulputate mi sit amet mauris commodo quis imperdiet. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Euismod quis viverra nibh cras pulvinar mattis nunc sed. Porttitor massa id neque aliquam vestibulum. Posuere morbi leo urna molestie. Nisi porta lorem mollis aliquam. Mattis rhoncus urna neque viverra justo nec ultrices dui.

Nisl rhoncus mattis rhoncus urna. Massa vitae tortor condimentum lacinia quis vel eros donec. Purus sit amet luctus venenatis lectus magna. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Dui id ornare arcu odio ut sem nulla pharetra. Erat imperdiet sed euismod nisi porta lorem. Faucibus in ornare quam viverra orci sagittis eu volutpat. Neque laoreet suspendisse interdum consectetur libero id. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque. Arcu cursus euismod quis viverra nibh cras pulvinar. Diam vel quam elementum pulvinar etiam non quam. Venenatis lectus magna fringilla urna porttitor rhoncus. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Netus et malesuada fames ac turpis egestas sed. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Aliquam ut porttitor leo a diam sollicitudin. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Gravida rutrum quisque non tellus orci ac auctor. Duis tristique sollicitudin nibh sit. Ac feugiat sed lectus vestibulum mattis.

Arcu risus quis varius quam quisque id. Accumsan in nisl nisi scelerisque eu. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Tincidunt augue interdum velit euismod. Mauris in aliquam sem fringilla ut morbi tincidunt. Feugiat in fermentum posuere urna nec tincidunt. Gravida quis blandit turpis cursus in. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Amet nulla facilisi morbi tempus iaculis. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Blandit volutpat maecenas volutpat blandit. Turpis cursus in hac habitasse platea dictumst quisque. Amet nisl purus in mollis nunc.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nunc faucibus a pellentesque sit amet porttitor. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Quis risus sed vulputate odio ut enim blandit volutpat. Eu lobortis elementum nibh tellus. Nunc non blandit massa enim. Non consectetur a erat nam at lectus. Egestas erat imperdiet sed euismod nisi porta. Lobortis mattis aliquam faucibus purus in massa tempor nec. Aenean sed adipiscing diam donec. Euismod in pellentesque massa placerat. Turpis nunc eget lorem dolor sed. Maecenas accumsan lacus vel facilisis volutpat est. Integer feugiat scelerisque varius morbi enim nunc faucibus. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Id aliquet risus feugiat in ante. Semper quis lectus nulla at volutpat diam ut venenatis. Nisi porta lorem mollis aliquam ut. Ac turpis egestas integer eget aliquet. Nisi lacus sed viverra tellus in hac habitasse platea. Nibh mauris cursus mattis molestie a iaculis at erat. Phasellus vestibulum lorem sed risus ultricies. Arcu odio ut sem nulla. Urna id volutpat lacus laoreet non. Aliquet sagittis id consectetur purus ut. Non sodales neque sodales ut etiam sit amet nisl purus. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Purus ut faucibus pulvinar elementum integer enim neque volutpat ac. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Nisi porta lorem mollis aliquam ut porttitor. Vulputate eu scelerisque felis imperdiet. Bibendum at varius vel pharetra vel turpis. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Habitant morbi tristique senectus et netus et malesuada. Neque aliquam vestibulum morbi blandit cursus. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Pharetra pharetra massa massa ultricies mi quis. Nisi lacus sed viverra tellus in. Eget sit amet tellus cras. Elit sed vulputate mi sit amet mauris commodo quis imperdiet. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Euismod quis viverra nibh cras pulvinar mattis nunc sed. Porttitor massa id neque aliquam vestibulum. Posuere morbi leo urna molestie. Nisi porta lorem mollis aliquam. Mattis rhoncus urna neque viverra justo nec ultrices dui. Nisl rhoncus mattis rhoncus urna. Massa vitae tortor condimentum lacinia quis vel eros donec. Purus sit amet luctus venenatis lectus magna. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Dui id ornare arcu odio ut sem nulla pharetra. Erat imperdiet sed euismod nisi porta lorem. Faucibus in ornare quam viverra orci sagittis eu volutpat. Neque laoreet suspendisse interdum consectetur libero id. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque. Arcu cursus euismod quis viverra nibh cras pulvinar. Diam vel quam elementum pulvinar etiam non quam. Venenatis lectus magna fringilla urna porttitor rhoncus. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Netus et malesuada fames ac turpis egestas sed. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Aliquam ut porttitor leo a diam sollicitudin. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Gravida rutrum quisque non tellus orci ac auctor. Duis tristique sollicitudin nibh sit. Ac feugiat sed lectus vestibulum mattis. Arcu risus quis varius quam quisque id. Accumsan in nisl nisi scelerisque eu. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Tincidunt augue interdum velit euismod. Mauris in aliquam sem fringilla ut morbi tincidunt. Feugiat in fermentum posuere urna nec tincidunt. Gravida quis blandit turpis cursus in. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Amet nulla facilisi morbi tempus iaculis. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Blandit volutpat maecenas volutpat blandit. Turpis cursus in hac habitasse platea dictumst quisque. Amet nisl purus in mollis nunc.
            </p>
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