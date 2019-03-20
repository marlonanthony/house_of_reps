import React from 'react' 

import './CommentsModal.css'

const PostModal = props => {
  return (
    <div className='CommentsModal'>
      {props.children}
    </div>
  )
}

export default PostModal 