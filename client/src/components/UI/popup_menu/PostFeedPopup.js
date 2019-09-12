import React from 'react'
import './Popup.css'

export default function PostFeedPopup(props) {
  const { 
    profile: { profiles }, 
    popupHandler, 
    post, 
    showPopup, 
    userNameOrAvatarClickedLikesPopup 
  } = props
  
  const profileInfo = profiles && profiles.map(profile => (
    profile.user._id === post.user && 
      <div className='postfeed_popup_profile_info' key={profile.user._id}>
        <img 
          onClick={() => userNameOrAvatarClickedLikesPopup(post.handle)} 
          className='popup-profile-img' 
          src={ post.avatar } 
          alt={ post.name } />
        <span onClick={() => userNameOrAvatarClickedLikesPopup(post.handle)}>
          { post.name }
        </span>
        <small>{ profile.bio }</small> 
        <a href={profile.website} target='_blank' rel='noopener noreferrer'>
          <p>{ profile.website }</p>
        </a>
      </div>
  ))

  return (
    <div className='popup' onMouseOver={popupHandler} onMouseOut={popupHandler}>
      <p className='post_name' // PostItem.css
        onClick={() => userNameOrAvatarClickedLikesPopup(post.handle)}>
        { post.name }
      </p>
      <div className={showPopup ? 'show popupcontent' : 'popupcontent'}>
        { profileInfo && profileInfo }
      </div>
    </div>
  )
}