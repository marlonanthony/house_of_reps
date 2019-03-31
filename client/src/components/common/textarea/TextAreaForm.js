import React, { Component } from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 

class TextAreaForm extends Component {



  render() {
    const { name, placeholder, value, error, info, onChange, onPaste, rows } = this.props 
    return (
      <div>
        <textarea 
          className={classnames('text-area', { // text-area is in PostForm.css
            '': error
          })}
          placeholder={ placeholder }
          name={ name }
          value={ value }
          onChange={ onChange }
          rows={ rows }
          onPaste={ onPaste }
        />
        { info && <small className=''>{ info }</small> }
        { error && (<div className='error'>{error}</div>) }
      </div>
    )
  }
}

TextAreaForm.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaForm