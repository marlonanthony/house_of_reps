import React from 'react' 

import './PostModal.css'

const PostModal = props => {
  return (
    <div>
      <div className='PostModal'>
        {props.children}
      </div>
    </div>
  )
}

export default PostModal 