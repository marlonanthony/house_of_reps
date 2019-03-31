import React from 'react'
import classnames from 'classnames' 
import PropTypes from 'prop-types' 

const SelectList = ({
  name, 
  value,
  error,
  info,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => (
    <option className='select-list-options' key={ option.label } value={ option.value }>
      { option.label }
    </option>
  ))

  return (
    <div className="">
      <select 
        className={classnames('select-list', {
          'is-invalid': error
        })}
        name={ name }
        value={ value }
        onChange={ onChange }>
        { selectOptions }
      </select>
      <br />
      { info && <small className='info'>{ info }</small>}
      { error && (<div className='invalid-feedback'>{ error }</div>)}
    </div>
  )
}

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectList