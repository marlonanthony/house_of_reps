import React from 'react'

import './PostAssetsModal.css'

const PostAssetsModal = props => {
  return (
    <div>
      <div className="PostAssetsModal">{props.children}</div>
    </div>
  )
}

export default PostAssetsModal
