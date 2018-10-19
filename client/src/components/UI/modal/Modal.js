import React from 'react' 
import classnames from 'classnames'

import './Modal.css'

const Modal = props => {
  return (
    <div>
      <div className='Modal'>
        {props.children}
      </div>
    </div>
  )
}

export default Modal 