import React, { Component } from 'react'

class PostFeedPopup extends Component {

  render() {
    const { profile: {profiles}, popupHandler, post, showPopup, userNameOrAvatarClicked  } = this.props
    let profileInfo = profiles && profiles.map(profile =>  {
      if(profile.user._id === post.user) {
        return (
          <div key={profile.user._id}>
            <p style={{ color: '#aaa', fontSize: 13, padding: '0px 5px', cursor: 'text' }}>{profile.bio}</p> 
            <a style={{textDecoration: 'none'}} href={profile.website} target='_blank'>
              <p style={{ color: 'rgb(29, 138, 228)', fontSize: 13 }}>{profile.website}</p>
            </a>
          </div>
        )
      }
    })
    return (
      <div className='popup' onMouseOver={popupHandler} onMouseOut={popupHandler}>
        <p className='post_name' onClick={() => this.props.userNameOrAvatarClicked(post.user)}>{post.name}</p>
        <div className={showPopup ? 'show popupcontent' : 'popupcontent'}>
          <img onClick={() => userNameOrAvatarClicked(post.user)} className='popup-profile-img' src={ post.avatar } alt={ post.name } />
          <span onClick={() => userNameOrAvatarClicked(post.user)} style={{color: 'rgb(29, 138, 228)', fontSize: 13}}>{post.name}</span>
          { profileInfo && profileInfo }
        </div>
      </div>
    )
  }
}
 
export default PostFeedPopup