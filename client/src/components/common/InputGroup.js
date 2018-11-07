import React from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 

const InputGroup = ({
  name, 
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <div>
        <span>
          <i className={ icon } style={{ marginRight: '5px', height: '40px', width: '40px', color: 'rgb(55, 131, 194)' }} />
        </span>
      </div>
      <input 
        className={classnames('social-links', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      { error && (<div className='invalid-feedback'>{error}</div>)}
    </div>
  )
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
  type: 'text' 
}

export default InputGroup