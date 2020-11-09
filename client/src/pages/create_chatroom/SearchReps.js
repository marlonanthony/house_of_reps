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
      className="searchbar_create_chatroom"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyPress={onMouseEnter}
    >
      <input
        className="searchbar_input_create_chatroom"
        placeholder={placeholder}
        type="text"
        name="matches"
        value={matches}
        onChange={e => setMatches(e.target.value)}
        onKeyPress={onMouseEnter}
        autoComplete="off"
      />
      {showMatches && (
        <div
          className={
            setInvites
              ? 'searchbar_create_chatroom_invites'
              : 'searchbar_create_chatroom_moderators'
          }
        >
          {profiles &&
            profiles.map(profile =>
              (profile.handle && 
              profile.handle.toLowerCase().includes(matches.toLowerCase())) ||
              (profile.name &&
              profile.name.toLowerCase().includes(matches.toLowerCase())) ||
              (profile.stageName &&
              profile.stageName
                .toLowerCase()
                .includes(matches.toLowerCase())) ? (
                <div
                  key={profile._id}
                  className="searchbar_items_create_chatroom"
                  onClick={() => {
                    setInvites &&
                      setInvites(invites => [
                        ...invites,
                        {
                          id: profile._id,
                          name: profile.name,
                          handle: profile.handle
                        }
                      ])
                    setModerators &&
                      setModerators(mods => [
                        ...mods,
                        {
                          id: profile._id,
                          name: profile.name,
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
