import React, { Component } from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import Moment from 'react-moment' 
import { deleteVenue } from '../../actions/profileActions'

import './Venue.css'

class Venues extends Component {
  onDeleteClick = id => {
    this.props.deleteVenue(id) 
  }

  render() {
    const venues = this.props.venues.map(venue => (
      <div key={venue._id} className='dashboard_venue_items'
          style={{
            display: 'flex', 
            margin: '10px', 
            alignItems: 'center',
            flexWrap: 'wrap',
            maxWidth: '400px',
            minHeight: '200px',
            justifyContent: 'space-around', }}>
        <p style={{padding: '10px'}}><Moment format='MM/DD/YYYY'>{venue.date}</Moment></p>
        <p style={{padding: '10px'}}>{venue.title}</p>
        <p style={{padding: '10px'}}>{venue.location}</p>
        {venue.video ? 
          <iframe width="400" height="300" src={venue.video} title={venue.title} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
          : null 
        }
        { venue.image && !venue.video ? 
            <img src={venue.image} width='100%' height='100%'/>
            : null 
        }
        <p style={{padding: '10px'}}>{venue.description}</p>
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
        <h3 style={{ 
          textAlign: 'center', 
          padding: '10px', 
          color: '#fff', 
          background: 'rgba(0,0,0,0.5)', 
          margin: '10px auto', 
          width: '100px', }} 
          className=''>Venues
        </h3>
        { venues }
      </div>
    )
  }
}

Venues.propTypes = {
  deleteVenue: PropTypes.func.isRequired
}

export default connect(null, { deleteVenue })(Venues)