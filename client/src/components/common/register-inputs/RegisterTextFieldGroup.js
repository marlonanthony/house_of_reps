import React from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 
import './RegisterTextFieldGroup.css'

const TextFieldGroup = ({
  name, 
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div style={{marginLeft: '-10%'}}>
      <input 
        type={type}
        className={classnames('register-inputs', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className=''>{info}</small>}
      { error && (<div className='error'>{error}</div>)}
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
}

TextFieldGroup.defaultProps = {
  type: 'text' 
}

export default TextFieldGroup