import React from 'react' 

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