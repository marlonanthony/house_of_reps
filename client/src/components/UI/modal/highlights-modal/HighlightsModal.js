import React from 'react' 
import './HighlightsModal.css'

const HighlightsModal = props => {
  console.log(props.myes)
  return (
    <div className='HighlightsModal'>
      {props.children}
    </div>
  )
}

export default HighlightsModal 