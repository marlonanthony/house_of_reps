import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'

import Spinner from '../../components/common/Spinner'
import ProfileContent from '../../components/profile/profile_content/ProfileContent'
import { getProfileByHandle } from '../../actions/profileActions'
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

  if(!profile || loading) return <Spinner />
  return <ProfileContent profiles={profiles} profile={profile} user={user} />
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