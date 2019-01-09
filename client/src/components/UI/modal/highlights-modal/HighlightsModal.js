import React from 'react' 
import './HighlightsModal.css'

const HighlightsModal = props => {
  return (
    <div>
      <div className='HighlightsModal'>
        {props.children}
      </div>
    </div>
  )
}

export default HighlightsModal 