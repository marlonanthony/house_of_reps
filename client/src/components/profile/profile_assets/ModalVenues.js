import React from 'react'

export default function ModalVenues({ venues, likeVenue }) {
  return venues.map(venue => (
    <div
      key={venue._id}
      style={{
        marginBottom: 40,
        border: '0.03px solid rgba(0, 255, 255, 0.03)'
      }}
    >
      {venue.title && (
        <p style={{ color: 'rgb(29, 138, 255)' }}>{venue.title}</p>
      )}
      {venue.video && (
        <iframe
          title={venue.video}
          src={venue.video}
          frameBorder={0}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          style={{ width: '95%', height: '62vh', marginTop: '15px' }}
        ></iframe>
      )}
      {!venue.video && venue.image && (
        <img
          src={venue.image}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          alt="profile_hightlights"
        />
      )}
      {venue.description && (
        <p style={{ color: '#666', padding: '0px 10px' }}>
          {venue.description}
        </p>
      )}
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
        <i
          onClick={() => likeVenue(venue._id, venue.user)}
          className="fas fa-thumbs-up icons"
          style={{ color: 'var(--secondary-color)', cursor: 'pointer' }}
        ></i>
        <p style={{ color: 'cyan' }}>{venue.likes && venue.likes.length}</p>
      </div>
    </div>
  ))
}
