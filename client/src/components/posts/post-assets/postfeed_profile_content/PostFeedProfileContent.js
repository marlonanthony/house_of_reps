import React from 'react'
import { Link } from 'react-router-dom'
import PostsProfilePopup from '../../../UI/popup_menu/PostsProfilePopup'

export default function PostFeedProfileContent(props) {
  return ( props.profile && 
    <div>
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <Link style={{textDecoration: 'none'}} to={`/profile/${props.profile.handle}`}>
          <img id='posts-profile-img' src={ props.user.avatar } alt={ props.user.name } />
        </Link>
      </div>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: "column", padding: '10px' }}>
        <PostsProfilePopup 
          popupHandler={props.popupHandler}
          profile={props.profile} 
          user={props.user} 
          showPopup={props.showPopup}
        />
        <div style={{display: 'flex', justifyContent: 'space-between' }}>
          { props.showLikes
            ? (<button onClick={props.showLikesHandler} style={{
            padding: 10, 
            margin: '0px 2px',
            flex: 1,
            background: 'rgba(0,0,0,1)', 
            color: 'rgb(55, 131, 194)', 
            cursor: 'pointer',
            border: '0.3px solid rgba(55,131,194, 0.1)',
            // border: 'none',
            outline: 'none'}}>
              Liked Post
            </button>)
            : (<button onClick={props.showLikesHandler} style={{
              padding: 10, 
              margin: '0px 2px',
              flex: 1,
              background: 'rgba(0,0,0,0.4)', 
              color: 'rgb(55, 131, 194)', 
              cursor: 'pointer',
              border: '0.3px solid rgba(55,131,194, 0.1)',
              borderRadius: '5px',
              outline: 'none'}}>
                Liked Post
            </button>)
          }
          <button style={{
            padding: 10, 
            margin: '0px 2px',
            flex: 1,
            background: 'rgba(0,0,0,0.4)', 
            color: 'rgb(55, 131, 194)', 
            cursor: 'pointer',
            border: '0.3px solid rgba(55,131,194, 0.1)',
            borderRadius: '5px',
            outline: 'none'}}>
            <Link to='/add-venue' style={{textDecoration: 'none', color: 'rgb(55,131,194)'}}>Add Highlight</Link>
          </button>
          <button onClick={props.showNotificationsHandler} style={{
            position: 'relative',
            padding: 10, 
            margin: '0px 2px',
            flex: 1,
            background: 'rgba(0,0,0,0.1)', 
            color: 'rgb(55, 131, 194)', 
            cursor: 'pointer',
            border: '0.3px solid rgba(55,131,194, 0.1)',
            borderRadius: '5px',
            outline: 'none'}}>
            { props.profile.notifications &&
              <i style={{fontSize: 15}}
                className={props.profile.notifications.filter(notification => !notification.seen).length > 0 ? 'far fa-bell red' : 'far fa-bell' }>
                <small className={ props.profile.notifications.filter(notification => !notification.seen).length > 0 
                  ? ' notification_count red' 
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
