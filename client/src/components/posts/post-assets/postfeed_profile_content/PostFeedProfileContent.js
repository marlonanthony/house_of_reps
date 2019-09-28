import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import PostsProfilePopup from '../../../UI/popup_menu/PostsProfilePopup'
import MobileNotifications from '../notifications/MobileNotifications'
import './PostFeedProfileContent.css'

const PostFeedProfileContent = ({
  showLikesHandler,
  profile,
  user,
  showLikes,
  ...props
}) => {
  const [showPopup, setShowPopup] = useState(false)

  return profile && user && (
    <>
    <MobileNotifications profile={profile} />
    <div className='post-feed-profile'>
      <div>
        <div className='post-profile-avatar-container'>
          <Link style={{ textDecoration: 'none' }} to={`/profile/${profile.handle}`}>
            <img id='posts-profile-img' src={ profile.user.avatar } alt={ user.name } />
          </Link>
        </div>
        <div className='post-profile-popup-and-buttons-container'>
          <PostsProfilePopup
            setShowPopup={setShowPopup}
            profile={profile} 
            user={user} 
            showPopup={showPopup}
          />
          <div className='post-profile-buttons-container'>
            { showLikes 
              ? <button 
                  className='post-profile-liked-posts-liked' 
                  onClick={showLikesHandler}  
                  title='liked posts' >
                  Liked Post
                </button>
              : <button 
                  className='post-profile-liked-posts-unliked' 
                  onClick={showLikesHandler}  
                  title='liked posts'>
                    Liked Post
                </button>
            }
              
            <button className='post-profile-add-media' title='add media' >
              <Link to='/add-venue' id='post-profile-add-media-link'>Add Media</Link>
            </button>
            <button 
              className='post-profile-notifications' 
              onClick={() => props.history.push('/notifications')}  
              title='notifications'>
              { profile.notifications &&
                <i style={{ fontSize: 15 }}
                  className={ profile.notifications
                    .filter(notification => !notification.seen).length > 0 
                      ? 'far fa-bell notification-color' 
                      : 'far fa-bell' 
                  }
                >
                  <small className={ profile.notifications
                    .filter(notification => !notification.seen).length > 0 
                      ? ' notification_count notification-color' 
                      : 'notification_count'}>{ profile.notifications
                      .filter(notification => !notification.seen).length }
                  </small>
                </i>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

PostFeedProfileContent.propTypes = {
  showLikesHandler: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  showLikes: PropTypes.bool.isRequired,
}

export default withRouter(PostFeedProfileContent)