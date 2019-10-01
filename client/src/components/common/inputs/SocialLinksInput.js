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
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px'}}>
        <i className={ icon } style={{ marginRight: '5px', fontSize: 19, width: 40, color: 'rgb(55, 131, 194)' }} />
        <input 
          className={classnames('social-links', { // social-links is in CreateProfile.css
            'is-invalid': error
          })}
          placeholder={ placeholder }
          name={ name }
          value={ value }
          onChange={ onChange }
        />
      </div>
      <div>
        { error && (<div className='invalid-feedback'>{ error }</div>)}
      </div>
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