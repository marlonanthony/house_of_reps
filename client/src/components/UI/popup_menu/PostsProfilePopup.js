import React from 'react'
import { Link } from 'react-router-dom' 

const PostFeedPopup = (props) => (
  <div className='popup' onMouseOver={props.popupHandler} onMouseOut={props.popupHandler}>
    <Link style={{textDecoration: 'none'}} to={`/profile/${props.profile.handle}`}>
      <p style={{ color: 'rgb(29, 138, 228)', fontSize: '13px' }}>@{ props.profile.handle }</p>
    </Link>
    <div className={props.showPopup ? 'show popupcontent' : 'popupcontent'}>
      <Link style={{textDecoration: 'none'}} to={`/profile/${props.profile.handle}`}>
        <img className='popup-profile-img' src={ props.user.avatar } alt={ props.user.name } />
      </Link>
      <Link style={{textDecoration: 'none'}} to={`/profile/${props.profile.handle}`}>
        <span style={{color: 'rgb(29, 138, 228)', fontSize: 13}}>{props.user.name}</span>
      </Link>
      <p style={{color: '#ccc', fontSize: 13, padding: '0px 5px', cursor: 'text'}}>{props.profile.bio}</p>
    </div>
  </div>
)

export default PostFeedPopup

