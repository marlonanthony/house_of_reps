import React from 'react'
import './CommentsModal.css'

const PostModal = props =>
  props.showModal && <div className="CommentsModal">{props.children}</div>

export default PostModal
