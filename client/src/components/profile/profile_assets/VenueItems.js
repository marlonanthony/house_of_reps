import React from 'react'

export default function VenueItems({
  venue,
  setShowModal,
  toggleShowHighlight,
  ...props
}) {
  return (
    <li className="venue-items">
      {venue.video && (
        <iframe
          id="profile_creds_video"
          title={venue._id}
          src={venue.video}
          width="330"
          height="200"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      )}
      {venue.image && !venue.video && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={venue.image} id="venue_profile_image" alt="new-venue" />
        </div>
      )}
      <img
        onClick={() =>
          props.postfeed ? toggleShowHighlight(0) : setShowModal(prev => !prev)
        }
        className="profile_highlights_toggle_modal"
        src={require('../../../img/hor-icon.jpg')}
        alt="hors"
        title={'🔥'}
      />
    </li>
  )
}
