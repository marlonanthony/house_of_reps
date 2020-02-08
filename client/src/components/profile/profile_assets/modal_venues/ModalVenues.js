import React from 'react'
import './ModalVenues.css'

export default function ModalVenues({ venues, likeVenue }) {
  return venues.map(venue => (
    <div key={venue._id}>
      {venue.video && (
        <iframe
          className="modal-venues-iframe"
          title={venue.video}
          src={venue.video}
          frameBorder={0}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        />
      )}
      <div className="modal-venues-icon-count-div">
        <i
          onClick={() => likeVenue(venue._id, venue.user)}
          className="fas fa-thumbs-up icons modal-venue-icon-count-item"
        />
        <p className="modal-venue-icon-count-item">
          {venue.likes && venue.likes.length}
        </p>
      </div>
    </div>
  ))
}
