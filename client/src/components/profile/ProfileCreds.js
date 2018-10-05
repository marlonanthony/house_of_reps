import React, { Component } from 'react'
import Moment from 'react-moment' 

class ProfileCreds extends Component {
  render() {
    const { venues } = this.props 

    const venueItems = venues.map(venue => (
      <li key={venue._id} className='list-group-item'>
        <p>
          <Moment format='MM/DD/YYYY'>{venue.date}</Moment>
        </p>
        <h4>{venue.title}</h4>
        <p>{venue.location === '' ? null : (<span>{venue.location}</span>)}</p>
        <p>{venue.description === '' ? null : (<span>{venue.description}</span>)}</p>
      </li>
    ))
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h3 className="text-center text-info">Venues</h3>
          {venueItems.length > 0 ? (
            <ul className='list-group'>{venueItems}</ul>
          ) : (<p className='text-center'>No Venues Listed</p>)}
        </div>
      </div>
    )
  }
}

export default ProfileCreds