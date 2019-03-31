import React from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 
import './Input.css'

const Input = ({
  name, 
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      <input 
        type={type}
        className={classnames('registers-inputs', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className='info'>{info}</small>}
      { error && (<div className='error'>{error}</div>)}
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
}

Input.defaultProps = {
  type: 'text' 
}

export default Input