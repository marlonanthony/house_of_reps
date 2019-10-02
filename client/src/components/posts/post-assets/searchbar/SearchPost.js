import React from 'react'
import PropTypes from 'prop-types'

const SearchPost = ({ onChange, hashtag, showHashtags, showPostByHashtag }) => (
  <div className="searchbarpost">
    <input
      placeholder="Search by hashtag"
      onChange={onChange}
      value={hashtag}
      name="hashtag"
      className="searchbarpostinput"
    />
    {showHashtags ? (
      <button
        style={{
          background: 'var(--secondary-color)',
          color: 'var(--text-color)'
        }}
        className="searchbarpostbtn"
        onClick={showPostByHashtag}
        title="posts by hashtag"
      >
        <i className="fas fa-search" />
      </button>
    ) : (
      <button
        className="searchbarpostbtn"
        onClick={showPostByHashtag}
        title="posts by hashtag"
      >
        <i className="fas fa-search" />
      </button>
    )}
  </div>
)

SearchPost.propTypes = {
  onChange: PropTypes.func.isRequired,
  hashtag: PropTypes.string.isRequired,
  showHashtags: PropTypes.bool.isRequired,
  showPostByHashtag: PropTypes.func.isRequired
}

export default SearchPost
