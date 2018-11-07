import React, { Component } from 'react'
import Moment from 'react-moment' 

import './ProfileCreds.css'

class ProfileCreds extends Component {
  render() {
    const { venues } = this.props 

    const venueItems = venues.map(venue => (
      <li key={venue._id} className='venue-items'>
        <p style={{color: 'rgb(55, 131, 194)'}}>
          <Moment format='MM/DD/YYYY'>{venue.date}</Moment>
        </p>
        <h4 style={{ color: '#ccc' }}>{venue.title}</h4>
        <p>{venue.location === '' ? null : (<span style={{color: '#7e8889'}}>{venue.location}</span>)}</p>
        <p style={{ color: '#7e8889' }}>{venue.description === '' ? null : (<span>{venue.description}</span>)}</p>
        <br/>
      </li>
    ))
    return (
      <div className='profile-creds'>
        <h4 id='profile-events-h4'>Highlights</h4>
        <div className='profile-creds-content'>
          {venueItems.length > 0 ? ( 
            venueItems.filter((val, i) => i < 4 ?  (<ul>{venueItems}</ul>) : null)
          ) : (<p id='no_venues'>Add some content</p>)}
        </div>
      </div>
    )
  }
}

export default ProfileCreds