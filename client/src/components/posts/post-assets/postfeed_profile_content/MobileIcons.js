import React from 'react'
import PropTypes from 'prop-types'

import MobileNotifications from '../../../../pages/notifications/MobileNotifications'

export default function MobileIcons({
  profile,
  showHighlight,
  setShowHighlight,
  showLikesHandler
}) {
  return (
    <div className="mobile_icons_container">
      <div onClick={() => setShowHighlight(prev => !prev)}>
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

MobileIcons.propTypes = {
  profile: PropTypes.object.isRequired,
  showHighlight: PropTypes.bool.isRequired,
  setShowHighlight: PropTypes.func.isRequired,
  showLikesHandler: PropTypes.func.isRequired
}
