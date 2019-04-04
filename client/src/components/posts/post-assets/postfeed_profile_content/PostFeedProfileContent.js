import React from 'react'
import { Link } from 'react-router-dom'
import PostsProfilePopup from '../../../UI/popup_menu/PostsProfilePopup'
import './PostFeedProfileContent.css'

export default function PostFeedProfileContent(props) {
  return ( props.profile && 
    <div>
      <div className='post-profile-avatar-container'>
        <Link style={{textDecoration: 'none'}} to={`/profile/${props.profile.handle}`}>
          <img id='posts-profile-img' src={ props.user.avatar } alt={ props.user.name } />
        </Link>
      </div>
      <div className='post-profile-popup-and-buttons-container'>
        <PostsProfilePopup 
          popupHandler={props.popupHandler}
          profile={props.profile} 
          user={props.user} 
          showPopup={props.showPopup}
        />
        <div className='post-profile-buttons-container'>
          { props.showLikes 
            ? (
              <button className='post-profile-liked-posts-liked' onClick={props.showLikesHandler}>
                Liked Post
              </button>
            )
            : (
              <button className='post-profile-liked-posts-unliked' onClick={props.showLikesHandler}>
                  Liked Post
              </button>
            )
          }
          <button className='post-profile-add-media'>
            <Link to='/add-venue' id='post-profile-add-media-link'>Add Media</Link>
          </button>
          <button className='post-profile-notifications' onClick={props.showNotificationsHandler}>
            { props.profile.notifications &&
              <i style={{fontSize: 15}}
                className={props.profile.notifications.filter(notification => !notification.seen).length > 0 ? 'far fa-bell notification-color' : 'far fa-bell' }>
                <small className={ props.profile.notifications.filter(notification => !notification.seen).length > 0 
                  ? ' notification_count notification-color' 
                  : 'notification_count'}>{ props.profile.notifications.filter(notification => !notification.seen).length}
                </small>
              </i>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
