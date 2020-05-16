import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getProfiles, searchProfiles } from '../../actions/profileActions'
import ProfileItem from './ProfileItem'
import useDebounce from '../../components/common/hooks/useDebounce'
import './Profiles.css'

const Profiles = ({ getProfiles, searchProfiles, ...props }) => {
  const [userInput, setUserInput] = useState(''),
    debouncedSearchTerm = useDebounce(userInput, 500)

  useEffect(() => {
    if (/\S/.test(debouncedSearchTerm)) {
      searchProfiles(debouncedSearchTerm)
    } else {
      getProfiles()
    }
  }, [debouncedSearchTerm, searchProfiles, getProfiles])

  const { profiles } = props.profile

  return (
    profiles && (
      <section id="members">
        <h2>Members</h2>
        <div className="reps-search-div">
          <input
            className="reps-search-input"
            type="text"
            onChange={e => setUserInput(e.target.value)}
            placeholder="search"
          />
          <button className="reps-search-btn" type="button">
            <i className={'fas fa-search reps-search-icon'} />
          </button>
        </div>
        <div className="profiles_container">
          {profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        </div>
      </section>
    )
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  searchProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getProfiles, searchProfiles }
)(Profiles)
