import React, { Component } from 'react'
import Moment from 'react-moment' 

import './ProfileCreds.css'

class ProfileCreds extends Component {
  render() {
    const { venues } = this.props 

    const venueItems = venues.map(venue => (
      <li key={venue._id} className='venue-items'>
        <p>
          <Moment format='MM/DD/YYYY'>{venue.date}</Moment>
        </p>
        <h4>{venue.title}</h4>
        <p>{venue.location === '' ? null : (<span>{venue.location}</span>)}</p>
        <p>{venue.description === '' ? null : (<span>{venue.description}</span>)}</p>
        <br/>
      </li>
    ))
    return (
      <div className='profile-creds'>
        <h4 id='profile-events-h4' style={{textAlign: 'center'}}>Highlights</h4>
        <div className='profile-creds-content'>
          
          {venueItems.length > 0 ? ( 
            venueItems.filter((val, i) => i < 4 ?  (<ul>{venueItems}</ul>) : null)
            // <ul className=''>{venueItems}</ul>
          ) : (<p className=''>No Venues Listed</p>)}
        </div>
      </div>
    )
  }
}

export default ProfileCreds