import React, { Component } from 'react'
// import Moment from 'react-moment' 

import './ProfileCreds.css'

class ProfileCreds extends Component {

  render() {
    const { venues } = this.props 

    const venueItems = venues.map(venue => (
      <li key={venue._id} className='venue-items'>
        { venue.video
          ? <iframe id='profile_creds_video' title={venue._id}  src={venue.video} width="330" height="200" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
          : null 
        }
        { venue.image && !venue.video
          ? <div style={{display: 'flex', justifyContent: 'center' }}>
              <img src={venue.image} id='venue_profile_image' alt="new-venue"/>
            </div>
          : null
        }
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