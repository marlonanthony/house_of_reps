import React from 'react' 

import './EmojiModal.css'

const EmojiModal = props => {
  return (
    <div>
      <div className='EmojiModal'>
        {props.children}
      </div>
    </div>
  )
}

export default EmojiModal 