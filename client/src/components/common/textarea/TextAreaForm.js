import React from 'react'
import PropTypes from 'prop-types'

import './TextAreaForm.css'

const TextAreaForm = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  onPaste,
  rows,
  fontSize,
  noFocus,
  onClick
}) => (
  <div>
    <textarea
      className="text-area"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      onPaste={onPaste}
      autoFocus={noFocus ? false : true}
      style={fontSize && { fontSize }}
      onClick={onClick}
    />
    {info && <small className="info">{info}</small>}
    {error && <div className="error">{error}</div>}
  </div>
)

TextAreaForm.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaForm
