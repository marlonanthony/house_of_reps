import React from 'react'
import { Link } from 'react-router-dom'
import './Popup.css'

const PostFeedPopup = props => (

  <div className='popup' onMouseOver={props.popupHandler} onMouseOut={props.popupHandler}>
    <Link to={`/profile/${props.profile.handle}`}>
      <p>@{ props.profile.handle }</p>
    </Link>

    <div className={props.showPopup ? 'show popupcontent' : 'popupcontent'}>
      <div className='postfeed_popup_profile_info'>
        <Link to={`/profile/${props.profile.handle}`}>
          <img className='popup-profile-img' src={ props.user.avatar } alt={ props.user.name } />
        </Link>
        <Link to={`/profile/${props.profile.handle}`}>
          <span>{props.user.name}</span>
        </Link>
        <p style={{ cursor: 'text'}}>{props.profile.bio}</p>
        <a href={props.profile.website} target='_blank' rel='noopener noreferrer'>
          <p>{props.profile.website && props.profile.website}</p>
        </a>
      </div>
    </div>

  </div>
)

export default PostFeedPopup

