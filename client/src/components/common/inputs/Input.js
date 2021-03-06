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
  onPaste,
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
        onPaste={onPaste}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="info">{info}</small>} {/*  in TextArea.css  */}
      {error && <div className="error">{error}</div>}
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
  onChange: PropTypes.func,
  disabled: PropTypes.string
}

Input.defaultProps = {
  type: 'text'
}

export default Input
