import React from 'react'
import PropTypes from 'prop-types'

const SearchPost = ({ onChange, hashtag, showHashtags, showPostByHashtag }) => (
  <div className="searchbarpost">
    <input
      placeholder="Search by Hashtag"
      onChange={onChange}
      value={hashtag}
      name="hashtag"
      type="text"
      className="searchbarpostinput"
    />
    {showHashtags ? (
      <button
        style={{
          background: 'var(--lighter)',
          color: 'var(--deep-color)'
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
