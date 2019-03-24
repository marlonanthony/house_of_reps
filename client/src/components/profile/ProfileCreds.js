import React, { Component, Fragment } from 'react'
// import Moment from 'react-moment' 
import HighlightsModal from '../UI/modal/highlights-modal/HighlightsModal'
import Backdrop from '../UI/backdrop/Backdrop'

import './ProfileCreds.css'

class ProfileCreds extends Component {

  state = { showModal: false  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  render() {
    const { venues } = this.props 

    const highlightsModal = this.state.showModal && (
      <Fragment>
        <HighlightsModal>
          { venues.map(venue => (
            <div key={venue._id} style={{ marginBottom: 40 }}>
              { venue.title && <p style={{color: 'rgb(29, 138, 255)'}}>{venue.title}</p> }
              { venue.video && 
                <iframe
                  title={venue.video}
                  src={venue.video}
                  frameBorder={0}
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen={true}
                  style={{ width: '95%', height: '80vh' }}>
                </iframe> 
              }
              { !venue.video && venue.image && 
                <img src={venue.image} style={{maxWidth: '100%', maxHeight: '100%'}} alt='profile_hightlights' />
              }
              { venue.description && <p style={{ color: '#666' }}>{venue.description}</p> }
            </div>
          ))
          }
        </HighlightsModal>
      </Fragment>
    ) 

    const venueItems = venues.map(venue => (
      <li key={venue._id} className='venue-items'>
        { venue.video &&
          <iframe id='profile_creds_video' title={venue._id}  src={venue.video} width="330" height="200" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
        }
        { venue.image && !venue.video &&
          <div style={{display: 'flex', justifyContent: 'center' }}>
            <img src={venue.image} id='venue_profile_image' alt="new-venue"/>
          </div>
        }
        <img onClick={this.modalToggle} className='profile_highlights_toggle_modal' src={require('../../img/hor-icon.jpg')} alt='hors' title={'🔥'}/>
      </li>
    ))
    return (
      <div className='profile-creds'>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        {highlightsModal}
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