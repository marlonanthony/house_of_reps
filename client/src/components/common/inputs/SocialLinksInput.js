import React from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 

const SocialLinksInput = ({
  name, 
  placeholder,
  value,
  error,
  icon,
  onChange
}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '10px'}}>
      <span>
        <i className={ icon } style={{ marginRight: '5px', height: '40px', width: '40px', color: 'rgb(55, 131, 194)' }} />
      </span>
      <input 
        className={classnames('social-links', { // social links is in CreateProfile.css
          'is-invalid': error
        })}
        placeholder={ placeholder }
        name={ name }
        value={ value }
        onChange={ onChange }
      />
      { error && (<div className='invalid-feedback'>{ error }</div>)}
    </div>
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