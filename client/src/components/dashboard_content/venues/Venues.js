import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { deleteVenue } from '../../../actions/profileActions'
import './Venue.css'

const Venues = ({ venues, deleteVenue }) => {
  const media =
    venues &&
    venues.map(venue => (
      <div key={venue._id} className="dashboard_venue_items">
        {venue.video && (
          <iframe
            className="dashboard_iframe"
            src={venue.video}
            title={venue.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          />
        )}
        {venue.image && !venue.video && (
          <img src={venue.image} alt="highlight" width="100%" height="100%" />
        )}
        <div style={{ padding: '10px' }}>
          <button id="venue-delete-btns" onClick={() => deleteVenue(venue._id)}>
            Delete
          </button>
        </div>
      </div>
    ))
  return (
    <div>
      <h3 className="dashboard_venues_header">Media</h3>
      <div className="dashboard_venues_container">{media}</div>
    </div>
  )
}

Venues.propTypes = {
  deleteVenue: PropTypes.func.isRequired,
  venues: PropTypes.array.isRequired
}

export default connect(
  null,
  { deleteVenue }
)(Venues)
