import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const NotificationList = ({ notifications, postHandler }) =>
  notifications && (
    <div className="notifications">
      <h1 id="notifications_header">Notifications</h1>
      {notifications.map(notification => (
        <div
          className={
            !notification.seen ? 'new_notification' : 'notifications_container'
          }
          key={notification._id}
        >
          <div className="notification_avatar_and_message_container">
            {notification.avatar && (
              <img
                src={notification.avatar}
                alt="avatar"
                className="notification_user_avatar"
              />
            )}
            {notification.message && (
              <p>
                <span className="notification_message">
                  {notification.message}
                </span>
              </p>
            )}
          </div>
          <div
            className="notification_post_content"
            onClick={() => postHandler(notification.postId)}
          >
            {notification.postText && (
              <p>
                {notification.postText.length >= 47
                  ? notification.postText.slice(0, 50) + '...'
                  : notification.postText}
              </p>
            )}
            {notification.postImage && (
              <img
                src={notification.postImage}
                alt="post img"
                className="notification_post_content_image"
              />
            )}
            {notification.highlight && (
              <iframe
                title="youtube"
                className="notification_highlights"
                src={notification.highlight.video}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            )}
            {!notification.highlight && notification.video && (
              <iframe
                title="youtube"
                className="notification_highlights"
                src={notification.video}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            )}
          </div>
          <div className="notification_icons">
            {notification.message && notification.message.includes('liked') ? (
              <i className="fas fa-thumbs-up icons"></i>
            ) : notification.message &&
              notification.message.includes('commented') ? (
              <i className="fas fa-comment icons" id="comment" />
            ) : null}
            {notification.highlight && (
              <p style={{ fontSize: 12 }}>
                {notification.highlight.likes &&
                  notification.highlight.likes.length}
              </p>
            )}
            {notification.post && (
              <p style={{ fontSize: 12 }}>
                {notification.post.likes && notification.post.likes.length}
              </p>
            )}
            {notification.comment && (
              <p style={{ fontSize: 12 }}>
                {notification.comment.likes &&
                  notification.comment.likes.length}
              </p>
            )}
            {notification.date && (
              <p className="notification_date">
                {notification.date &&
                Math.abs(new Date(notification.date) - new Date()) >
                  259200000 ? (
                  <Moment format="ddd, ll LT">{notification.date}</Moment>
                ) : Math.abs(new Date(notification.date) - new Date()) >
                  172800000 ? (
                  '2 days ago'
                ) : Math.abs(new Date(notification.date) - new Date()) >=
                  86400000 ? (
                  'yesterday'
                ) : Math.abs(new Date(notification.date) - new Date()) >
                  7200000 ? (
                  Math.floor(
                    Math.abs(new Date(notification.date) - new Date()) / 3600000
                  ) + ' hours ago'
                ) : Math.abs(new Date(notification.date) - new Date()) >
                  3600000 ? (
                  '1 hour ago'
                ) : Math.abs(new Date(notification.date) - new Date()) >=
                  60000 ? (
                  Math.floor(
                    Math.abs(new Date(notification.date) - new Date()) / 60000
                  ) + ' minutes ago'
                ) : (
                  Math.floor(
                    Math.abs(new Date(notification.date) - new Date()) / 1000
                  ) + ' seconds ago'
                )}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
  postHandler: PropTypes.func.isRequired
}

export default NotificationList

//   31, 449, 600, 000 ms === 1 Year
//    2, 592, 000, 000 ms === 1 Month (30 Days)
//       604, 800, 000 ms === 1 Week
//        86, 400, 000 ms === 1 Day
//         3, 600, 000 ms === 1 Hour
//             60, 000 ms === 1 minute
