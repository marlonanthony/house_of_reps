import React from 'react'
import './Popup.css'

export default function PostFeedPopup(props) {
  const {
    profilesArr,
    comment,
    profile, 
    popupHandler, 
    post,
    showPopup, 
    userNameOrAvatarClickedLikesPopup 
  } = props

  let profileInfo
  
  if(!comment && !profilesArr) profileInfo = profile.profiles && profile.profiles.map(profile => (
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
  else profileInfo = profilesArr && profilesArr.map(profile => (
    profile.user._id === comment.user && 
      <div className='postfeed_popup_profile_info' key={profile.user._id}>
        <img 
          onClick={() => userNameOrAvatarClickedLikesPopup(comment.handle)} 
          className='popup-profile-img' 
          src={ comment.avatar } 
          alt={ comment.name } />
        <span onClick={() => userNameOrAvatarClickedLikesPopup(comment.handle)}>
          { comment.name }
        </span>
        <small>{ profile.bio }</small> 
        <a href={profile.website} target='_blank' rel='noopener noreferrer'>
          <p>{ profile.website }</p>
        </a>
      </div>
  ))

  return (
    <div className='popup' onMouseOver={popupHandler} onMouseOut={popupHandler}>
      <p className={ !comment ? 'post_name' : 'comment-feed-name' } // post_name is in PostItem.css
        onClick={() => !comment 
        ? userNameOrAvatarClickedLikesPopup(post.handle)
        : userNameOrAvatarClickedLikesPopup(comment.handle)}>
        { !comment ? post.name : comment.name }
      </p>
      <div className={showPopup ? 'show popupcontent' : 'popupcontent'}>
        { profileInfo && profileInfo }
      </div>
    </div>
  )
}