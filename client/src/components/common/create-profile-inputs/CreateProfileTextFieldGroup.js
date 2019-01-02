import React from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 
import './CreateProfileTextFieldGroup.css'

const CreateProfileTextFieldGroup = ({
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
      <input 
        type={type}
        className={classnames('create-profile-text-field-group-inputs', {
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

CreateProfileTextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
}

CreateProfileTextFieldGroup.defaultProps = {
  type: 'text' 
}

export default CreateProfileTextFieldGroup