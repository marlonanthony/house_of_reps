import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { likeVenue } from '../../../actions/profileActions'
import HighlightsModal from '../../UI/modal/highlights-modal/HighlightsModal'
import Backdrop from '../../UI/backdrop/Backdrop'
import VenueItems from '../profile_assets/VenueItems'
import ModalVenues from '../profile_assets/ModalVenues'
import FadeIn from '../../UI/fade_in/FadeIn'
import './ProfileCreds.css'

class ProfileCreds extends Component {

  state = { showModal: false  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  likeHighlight = (venueId, venueUserId) => {
    this.props.likeVenue(venueId, venueUserId)
  }

  render() {
    const { venues } = this.props 

    const highlightsModal = this.state.showModal && (
      <HighlightsModal>
        <ModalVenues
          venues={venues}
          likeHighlight={this.likeHighlight}
        />
      </HighlightsModal>
    ) 

    const venueItems = venues.map(venue => (
      <FadeIn key={venue._id}>
        <VenueItems 
          venue={venue}
          modalToggle={this.modalToggle}
        />
      </FadeIn>
    ))

    return (
      <div id='profile-creds-div'>
        <div className='profile-creds'>
          <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
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
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { likeVenue })(ProfileCreds)