import React from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 
import './RegisterTextAreaFieldGroup.css'

const RegisterTextAreaFieldGroup = ({
  name, 
  placeholder,
  value,
  error,
  info,
  type,
  onPaste,
  onChange,
  disabled
}) => {
  return (
    <div>
      <textarea 
        type={type}
        className={classnames('register-text-area-field-group-inputs', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onPaste={onPaste}
        onChange={onChange}
        disabled={disabled}
      />
      <br />
      {info && <small className=''>{info}</small>}
      { error && (<div className='error'>{error}</div>)}
    </div>
  )
}

RegisterTextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
}

RegisterTextAreaFieldGroup.defaultProps = {
  type: 'text' 
}

export default RegisterTextAreaFieldGroup