import React from 'react'
import PropTypes from 'prop-types'

export default function VenueItems({
  venue,
  setShowModal,
  toggleShowHighlight,
  postfeed
}) {
  return (
    <li className="venue-items">
      {venue.video && (
        <iframe
          id="profile_creds_video"
          title={venue._id}
          src={venue.video}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      )}
      <img
        onClick={() =>
          postfeed ? toggleShowHighlight() : setShowModal(prev => !prev)
        }
        className="profile_highlights_toggle_modal"
        src={require('../../../img/hor-icon.jpg')}
        alt="HORs logo"
        title="toggle modal"
      />
    </li>
  )
}

VenueItems.propTypes = {
  venue: PropTypes.object.isRequired,
  setShowModal: PropTypes.func,
  toggleShowHighlight: PropTypes.func,
  postfeed: PropTypes.bool
}
