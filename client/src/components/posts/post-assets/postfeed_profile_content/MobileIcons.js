import React from 'react'
import MobileNotifications from '../notifications/MobileNotifications'

export default function MobileIcons({
  profile,
  showHighlight,
  toggleShowHighlight,
  showLikesHandler
}) {
  return (
    <div className="mobile_icons_container">
      <div onClick={() => toggleShowHighlight(0)}>
        <i
          className={
            showHighlight
              ? 'far fa-play-circle notification-color'
              : 'far fa-play-circle'
          }
        />
      </div>
      <div onClick={showLikesHandler}>
        <i className="fas fa-thumbs-up" />
      </div>
      <MobileNotifications profile={profile} />
    </div>
  )
}
