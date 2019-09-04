import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'

import ProfileHeader from '../profile_header/ProfileHeader' 
import Spinner from '../../common/Spinner'
import { getProfileByHandle } from '../../../actions/profileActions'
import './Profile.css'

class Profile extends Component {
  componentDidMount() {
    if(this.props.match.params.handle === 'undefined') {
      return this.props.history.push('/dashboard')
    }
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle) 
    }
  }

  render() {
    const { profile, loading } = this.props.profile
    const { user } = this.props.auth
    let profileContent

    if(!profile || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = <ProfileHeader profile={profile} user={user} />
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
  profile: state.profile,
  auth: state.auth 
})

export default connect(mapStateToProps, { getProfileByHandle })(withRouter(Profile))