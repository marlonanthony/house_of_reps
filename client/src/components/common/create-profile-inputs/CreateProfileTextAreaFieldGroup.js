import React, { Component } from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 
import './CreateProfileTextAreaFieldGroup.css'

class CreateProfileTextAreaFieldGroup extends Component {



  render() {
    const { name, placeholder, value, error, info, onChange, onPaste, rows } = this.props 
    return (
      <div className="">
        <textarea 
          className={classnames('create-profile-text-area', {
            '': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          onPaste={onPaste}
        />
        <br />
        {info && <small className='info'>{info}</small>}
        { error && (<div className='error'>{error}</div>)}
      </div>
    )
  }
}

CreateProfileTextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default CreateProfileTextAreaFieldGroup