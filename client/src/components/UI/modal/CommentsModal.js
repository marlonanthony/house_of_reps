import React from 'react' 

import './CommentsModal.css'

const PostModal = props => {
  return (
    <div>
      <div className='CommentsModal'>
        {props.children}
      </div>
    </div>
  )
}

export default PostModal 