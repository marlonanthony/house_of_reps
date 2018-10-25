import React, { Component } from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import Moment from 'react-moment' 

import { deleteVenue } from '../../actions/profileActions'

class Venues extends Component {
  onDeleteClick = id => {
    this.props.deleteVenue(id) 
  }

  render() {
    const venues = this.props.venues.map(venue => (
      <tr key={venue._id}>
        <td style={{padding: '10px'}}><Moment format='MM/DD/YYYY'>{venue.date}</Moment></td>
        <td style={{padding: '10px'}}>{venue.title}</td>
        <td style={{padding: '10px'}}>{venue.location}</td>
        <td style={{padding: '10px'}}><button onClick={ this.onDeleteClick.bind(this, venue._id) }>Delete</button></td>
      </tr>
    ))
    return (
      <div>
        <h4 style={{ textAlign: 'center' }} className=''>Venues</h4>
        <table className="">
          <thead>
            <tr>
              <th >Date</th>
              <th >Title</th>
              <th>Location</th>
            </tr>
              { venues }
            </thead>
        </table>
      </div>
    )
  }
}

Venues.propTypes = {
  deleteVenue: PropTypes.func.isRequired
}

export default connect(null, { deleteVenue })(Venues)