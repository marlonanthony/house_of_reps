import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

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
      className={classnames('text-area', {
        // text-area is in PostForm.css
        '': error
      })}
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
    {info && <small className="">{info}</small>}
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
