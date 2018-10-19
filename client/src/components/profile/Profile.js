import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { Link } from 'react-router-dom' 

import ProfileHeader from './ProfileHeader' 
// import ProfilePost from './ProfilePost'
import ProfileCreds from './ProfileCreds'
import Spinner from '../common/Spinner'
import { getProfileByHandle } from '../../actions/profileActions'

import './Profile.css'

class Profile extends Component {
  componentDidMount() {
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle) 
    }
  }

  render() {
    const { profile, loading } = this.props.profile
    let profileContent

    if(profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <Link to='/djs' id='back-to-profiles-button'>
            <img id='profile-back-button' src={require('../../img/back.png')} alt='back-button' />
          </Link>
          <ProfileHeader profile={profile} />
          <ProfileCreds venues={profile.venues} />
        </div>
      )
    }

    return (
      <div className='profile-container'>
        <div className='profile'>
          {profileContent}
          {/* <div id='profile-post'><ProfilePost /></div> */}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)