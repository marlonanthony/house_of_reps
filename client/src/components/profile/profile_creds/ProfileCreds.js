import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { likeVenue } from '../../../actions/profileActions'
import HighlightsModal from '../../UI/modal/highlights-modal/HighlightsModal'
import Backdrop from '../../UI/backdrop/Backdrop'
import VenueItems from '../profile_assets/VenueItems'
import ModalVenues from '../profile_assets/modal_venues/ModalVenues'
import FadeIn from '../../UI/fade_in/FadeIn'
import './ProfileCreds.css'

const ProfileCreds = ({ likeVenue, venues, user, profile, ...props }) => {
  const [showModal, setShowModal] = useState(false)

  const highlightsModal = showModal && (
    <HighlightsModal>
      <ModalVenues venues={venues} likeVenue={likeVenue} />
    </HighlightsModal>
  )

  const venueItems =
    venues &&
    venues.map(venue => (
      <FadeIn key={venue._id}>
        <VenueItems venue={venue} setShowModal={setShowModal} />
      </FadeIn>
    ))

  return (
    <div id="profile-creds-div">
      <div className="profile-creds">
        <Backdrop
          clicked={() => setShowModal(prev => !prev)}
          show={showModal}
        />
        {highlightsModal}
        <div className="profile-creds-content">
          {venueItems && venueItems.length ? (
            venueItems.filter((_, i) => i < 6 && <ul>{venueItems}</ul>)
          ) : user.handle === props.match.params.handle ? (
            <p id="no_venues">
              <Link to="/add-venue">Add some content</Link>
            </p>
          ) : (
            <p id="no_venues">{profile.user.name}, not a big content guy</p>
          )}
        </div>
      </div>
    </div>
  )
}

ProfileCreds.propTypes = {
  likeVenue: PropTypes.func.isRequired,
  venues: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(
  null,
  { likeVenue }
)(withRouter(ProfileCreds))
