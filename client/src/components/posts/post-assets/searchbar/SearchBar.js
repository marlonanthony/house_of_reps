import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const SearchBar = ({ profiles }) => {
  const [matches, setMatches] = useState(''),
    [showMatches, setShowMatches] = useState(false)

  const onMouseEnter = () => {
    setShowMatches(true)
  }

  const onMouseLeave = () => {
    setShowMatches(false)
  }

  return (
    <div
      className="searchbar"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyPress={onMouseEnter}
    >
      <input
        className="searchbar_input"
        placeholder=" Search Reps"
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
              profile.name.toLowerCase().includes(matches.toLowerCase()) ||
              profile.stageName
                .toLowerCase()
                .includes(matches.toLowerCase()) ? (
                <Link
                  key={profile._id}
                  to={`/profile/${profile.handle}`}
                  className="searchbar_items"
                >
                  @{profile.handle}
                </Link>
              ) : null
            )}
        </div>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  profiles: PropTypes.array
}

export default SearchBar
