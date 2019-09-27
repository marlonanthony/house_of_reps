import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'

import ProfileHeader from '../profile_header/ProfileHeader'
import { getProfileByHandle } from '../../../actions/profileActions'
import './Profile.css'

const Profile = ({
  auth,
  getProfileByHandle,
  ...props
}) => {

  useEffect(() => {
    if(props.match.params.handle === 'undefined') {
      props.history.push('/dashboard')
    }
    if(props.match.params.handle) {
      getProfileByHandle(props.match.params.handle) 
    }
  },[props.match.params.handle, getProfileByHandle])

  const { profile, loading, profiles } = props.profile
  const { user } = auth
  let profileContent

  if(!profile || loading) {
    profileContent = null
  } else {
    profileContent = <ProfileHeader profiles={profiles} profile={profile} user={user} />
  }

  return (
    <div className='profile-container'>
      <div className='profile'>
        {profileContent}
      </div>
    </div>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth 
})

export default connect(mapStateToProps, { getProfileByHandle })(withRouter(Profile))