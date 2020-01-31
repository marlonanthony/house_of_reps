import React from 'react'
import PropTypes from 'prop-types'

import MobileNotifications from '../../../../pages/notifications/MobileNotifications'

const MobileIcons = ({
  profile,
  showHighlight,
  toggleHighlight,
  showLikesHandler
}) => {
  return (
    <div className="mobile_icons_container">
      <div onClick={toggleHighlight}>
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

export default MobileIcons

MobileIcons.propTypes = {
  profile: PropTypes.object.isRequired,
  showHighlight: PropTypes.bool.isRequired,
  toggleHighlight: PropTypes.func.isRequired,
  showLikesHandler: PropTypes.func.isRequired
}
