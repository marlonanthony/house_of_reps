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
        placeholder=" Search Members"
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
              (profile.handle &&
                profile.handle.toLowerCase().includes(matches.toLowerCase())) ||
              (profile.name &&
                profile.name.toLowerCase().includes(matches.toLowerCase())) ||
              (profile.stageName &&
                profile.stageName
                  .toLowerCase()
                  .includes(matches.toLowerCase())) ? (
                    <Link
                      key={profile._id}
                      to={`/profile/${profile.handle}`}
                      className="searchbar_items" // In Posts.css
                    >
                      <img 
                        className='post_avatar_img' // In PostItem.css
                        style={{ border: 'none' }}
                        src={profile.avatar} 
                        alt={`${profile.handle}'s avatar`}
                      />
                      <p>@{profile.handle}</p>
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
