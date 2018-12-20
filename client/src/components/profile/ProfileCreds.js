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
        { venue.video
          ? <iframe id='profile_creds_video' width="330" height="200" src={venue.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
          : null 
        }
        <p style={{ color: '#7e8889', textAlign: 'center' }}>{venue.description === '' ? null : (<span>{venue.description}</span>)}</p>
        <br/>
      </li>
    ))
    return (
      <div className='profile-creds'>
        <h4 id='profile-events-h4'>Highlights</h4>
        <div className='profile-creds-content'>
          { venueItems.length > 0 ? ( 
            venueItems.filter((val, i) => i < 4 ?  (<ul>{venueItems}</ul>) : null)
          ) : (<p id='no_venues'>Add some content</p>)}
        </div>
      </div>
    )
  }
}

export default ProfileCreds