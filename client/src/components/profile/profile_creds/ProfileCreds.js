import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { likeVenue } from '../../../actions/profileActions'
import HighlightsModal from '../../UI/modal/highlights-modal/HighlightsModal'
import Backdrop from '../../UI/backdrop/Backdrop'
import VenueItems from '../profile_assets/VenueItems'
import ModalVenues from '../profile_assets/ModalVenues'
import FadeIn from '../../UI/fade_in/FadeIn'
import './ProfileCreds.css'

const ProfileCreds = ({ likeVenue, venues }) => {

  const [showModal, setShowModal] = useState(false)

  const highlightsModal = showModal && (
    <HighlightsModal>
      <ModalVenues
        venues={venues}
        likeVenue={likeVenue}
      />
    </HighlightsModal>
  ) 

  const venueItems = venues.map(venue => (
    <FadeIn key={venue._id}>
      <VenueItems 
        venue={venue}
        setShowModal={setShowModal}
      />
    </FadeIn>
  ))

  return (
    <div id='profile-creds-div'>
      <div className='profile-creds'>
        <Backdrop clicked={() => setShowModal(prev => !prev)} show={showModal} />
        { highlightsModal }
        <div className='profile-creds-content'>
          { venueItems.length > 0 
            ? venueItems.filter((_, i) => i < 6 ?  (<ul>{venueItems}</ul>) : null)
            : <p id='no_venues'><Link to='/add-venue'>Add some content</Link></p> }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { likeVenue })(ProfileCreds)