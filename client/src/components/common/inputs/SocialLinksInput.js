import React from 'react'
import PropTypes from 'prop-types'

import './SocialLinksInput.css'

const SocialLinksInput = ({
  name,
  placeholder,
  value,
  error,
  icon,
  onChange
}) => {
  return (
    <>
      <div className="social-links-container">
        <i className={icon + ' social-links-icons'} />
        <input
          className="social-links"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
      <div>{error && <div className="error">{error}</div>}</div>
    </>
  )
}

SocialLinksInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

SocialLinksInput.defaultProps = {
  type: 'text'
}

export default SocialLinksInput
