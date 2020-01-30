import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfiles } from '../../actions/profileActions'

import ProfileItem from './ProfileItem'
import './Profiles.css'

const Profiles = ({ getProfiles, ...props }) => {
  useEffect(() => {
    getProfiles()
  }, [])

  const { profiles } = props.profile

  return (
    profiles && (
      <div style={{ paddingTop: 10 }}>
        <h2>Reps</h2>
        <div className="profiles_container">
          {profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        </div>
      </div>
    )
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles)
