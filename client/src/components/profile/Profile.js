import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 

import ProfileHeader from './ProfileHeader' 
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
          <ProfileHeader profile={profile} />
        </div>
      )
    }

    return (
      <div className='profile-container'>
        <div className='profile'>
          {profileContent}
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