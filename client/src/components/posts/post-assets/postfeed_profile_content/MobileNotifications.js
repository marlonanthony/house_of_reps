import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const MobileNotifications = ({ profile, ...props }) => {
  return (
    <div className="notifications_on_mobile">
      <button
        className="post-profile-notifications"
        style={{ background: 'none', padding: 'none' }}
        onClick={() => props.history.push('/notifications')}
        title="notifications"
      >
        {profile && profile.notifications && (
          <i
            style={{ fontSize: 15 }}
            className={
              profile.notifications.filter(notification => !notification.seen)
                .length > 0
                ? 'far fa-bell notification-color'
                : 'far fa-bell'
            }
          >
            <small
              className={
                profile.notifications.filter(notification => !notification.seen)
                  .length > 0
                  ? ' notification_count notification-color'
                  : 'notification_count'
              }
            >
              {
                profile.notifications.filter(notification => !notification.seen)
                  .length
              }
            </small>
          </i>
        )}
      </button>
      <label htmlFor="mobile_icon_notification">notifications</label>
    </div>
  )
}

MobileNotifications.propTypes = {
  profile: PropTypes.object.isRequired
}

export default withRouter(MobileNotifications)
