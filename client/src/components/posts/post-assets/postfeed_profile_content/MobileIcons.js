import React from 'react'
import PropTypes from 'prop-types'

import MobileNotifications from './MobileNotifications'

const MobileIcons = ({
  profile,
  showHighlight,
  toggleHighlight,
  showLikesHandler
}) => {
  return (
    <div className="mobile_icons_container">
      <div className="mobile_icon_media_div" onClick={toggleHighlight}>
        <i
          id="mobile_icon_media"
          className={
            showHighlight
              ? 'far fa-play-circle notification-color'
              : 'far fa-play-circle'
          }
        />
        <label htmlFor="mobile_icon_media">media</label>
      </div>
      <div className="mobile_icon_like_div" onClick={showLikesHandler}>
        <i id="mobile_icon_like" className="fas fa-thumbs-up" />
        <label htmlFor="mobile_icon_like">liked posts</label>
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
