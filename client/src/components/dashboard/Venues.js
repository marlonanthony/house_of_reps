import React, { Component } from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { deleteVenue } from '../../actions/profileActions'

import './Venue.css'

class Venues extends Component {
  onDeleteClick = id => {
    this.props.deleteVenue(id) 
  }

  render() {
    const venues = this.props.venues.map(venue => (
      <div key={venue._id} className='dashboard_venue_items'>
        {venue.video ? 
          <iframe className='dashboard_iframe' src={venue.video} title={venue.title} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
          : null 
        }
        { venue.image && !venue.video ? 
            <img src={venue.image} alt='highlight' width='100%' height='100%'/>
            : null 
        }
        <div style={{padding: '10px'}}>
          <button
            id='venue-delete-btns'
            onClick={ this.onDeleteClick.bind(this, venue._id) }>
              Delete
          </button>
        </div>
      </div>
    ))
    return (
      <div>
        <h3 className='dashboard_venues_header'>Media</h3>
        <div className='dashboard_venues_container'>
          { venues }
        </div>
      </div>
    )
  }
}

Venues.propTypes = {
  deleteVenue: PropTypes.func.isRequired
}

export default connect(null, { deleteVenue })(Venues)