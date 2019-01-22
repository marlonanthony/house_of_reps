import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import Spinner from '../common/Spinner'
import ProfileItem from './ProfileItem'
// import Moment from 'react-moment'
// import ProfileHighlights from './ProfileHighlights'
import { getProfiles } from '../../actions/profileActions'
import './Profiles.css'
// import background from 'http://outdoor.lv/wp-content/uploads/2018/10/vIjpM9.jpg'

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles()
  }

  render() {
    const { profiles, loading } = this.props.profile
    let profileItems, highlights 

    if(profiles === null || loading) {
      profileItems = <Spinner />
    } else if(profiles.length > 0) {
      profileItems = profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ))
    } else {
      profileItems = <h4>No profiles found...</h4>
    }

    if(profiles === null || loading) highlights = null
    else highlights = profiles.map(profile => profile.venues)
    let firstHighlight = highlights && highlights.map(val => val.length > 0 ? val[0] : null).filter(val => val !== null)
    let first = [].concat.apply([], firstHighlight)
    

    return (
      <div>
        <div style={{
          backgroundImage: `url(http://outdoor.lv/wp-content/uploads/2018/10/vIjpM9.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh', }}>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '10px', alignItems: 'center'}}>
          { first[2] ?
            <iframe id='profile_creds_video' title={first[0].video} width="330" height="200" src={first[2].video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
            : null
          }
          {/* { first.map(venue => (
            <li key={venue._id} className='firstHighlight'>
              { venue.date ? 
              <p style={{color: 'rgb(55, 131, 194)'}}>
                <Moment format='MM/DD/YYYY'>{venue.date}</Moment>
              </p> : null
              }
              <h4 style={{ color: '#ccc' }}>{venue.title}</h4>
              <p>{venue.location === '' ? null : (<span style={{color: '#7e8889'}}>{venue.location}</span>)}</p>
              { venue.video
                ? <iframe id='profile_creds_video' title={venue._id} width="330" height="200" src={venue.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                : null 
              }
              { !venue.video && venue.image 
                ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={venue.image} style={{maxHeight: '200px', maxWidth: '100%'}} alt="venue"/>
                  </div>
                : null 
              }
              <p style={{ color: '#7e8889', textAlign: 'center' }}>{venue.description === '' ? null : (<span>{venue.description}</span>)}</p>
            </li>
          ))} */}
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: '100px 5px 20px 5px',
            alignItems: 'center' }}>
            { profileItems }
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.loading
})

export default connect(mapStateToProps, { getProfiles })(Profiles) 