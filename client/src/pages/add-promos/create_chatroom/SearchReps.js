import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SearchReps = ({ profiles, setInvites, setModerators, placeholder }) => {
  const [matches, setMatches] = useState(''),
    [showMatches, setShowMatches] = useState(false)

  const onMouseEnter = () => {
    setShowMatches(true)
  }

  const onMouseLeave = () => {
    !matches.length && setShowMatches(false)
  }

  useEffect(() => {
    !matches.length && setShowMatches(false)
  }, [matches, setShowMatches])

  return (
    <div
      className="searchbar"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyPress={onMouseEnter}
    >
      <input
        className="searchbar_input"
        placeholder={placeholder}
        type="text"
        name="matches"
        value={matches}
        onChange={e => setMatches(e.target.value)}
        onKeyPress={onMouseEnter}
      />
      {showMatches && (
        <div>
          {profiles &&
            profiles.map(profile =>
              profile.handle.toLowerCase().includes(matches.toLowerCase()) ||
              profile.user.name.toLowerCase().includes(matches.toLowerCase()) ||
              profile.stageName
                .toLowerCase()
                .includes(matches.toLowerCase()) ? (
                <div
                  key={profile.user._id}
                  className="searchbar_items"
                  onClick={() => {
                    setInvites &&
                      setInvites(invites => [
                        ...invites,
                        {
                          id: profile.user._id,
                          name: profile.user.name,
                          handle: profile.handle
                        }
                      ])
                    setModerators &&
                      setModerators(mods => [
                        ...mods,
                        {
                          id: profile.user._id,
                          name: profile.user.name,
                          handle: profile.handle
                        }
                      ])
                  }}
                >
                  @{profile.handle}
                </div>
              ) : null
            )}
        </div>
      )}
    </div>
  )
}

SearchReps.propTypes = {
  profiles: PropTypes.array,
  setInvites: PropTypes.func,
  setModerators: PropTypes.func,
  placeholder: PropTypes.string
}

export default SearchReps
