import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

import Spinner from '../../components/common/Spinner'
import ProfileContent from '../../components/profile/profile_content/ProfileContent'
import { getProfileByHandle } from '../../actions/profileActions'
import './Profile.css'

const Profile = ({ auth, getProfileByHandle, ...props }) => {
  useEffect(() => {
    if (props.match.params.handle === 'undefined') {
      props.history.push('/dashboard')
    }
    if (props.match.params.handle) {
      getProfileByHandle(props.match.params.handle)
    }
  }, [props.match.params.handle, getProfileByHandle])

  const { profile, loading } = props.profile
  const { user } = auth

  if (props.profile && loading) return <Spinner />

  if (!profile && props.match.params.handle !== user.handle) {
    return (
      <div className="no_profile">
        <h2>This one's not big on profiles</h2>
      </div>
    )
  }

  if (!profile && props.match.params.handle === user.handle) {
    return (
      <div className="no_profile">
        <Link to="/create-profile">Create Profile</Link>
      </div>
    )
  }

  return (
    <ProfileContent
      handle={props.match.params.handle}
      profile={profile}
      user={user}
    />
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

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(withRouter(Profile))
