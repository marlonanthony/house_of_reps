import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../../../../post-assets/text/PostText'

export default function CommentWithPhoto({ modalShow, comment }) {
  return (
    <div onClick={modalShow}>
      <PostText fontSize="13px" postText={comment.text} />
      <img src={comment.media} alt="uploaded" className="comments_image" />
    </div>
  )
}

CommentWithPhoto.propTypes = {
  comment: PropTypes.object.isRequired,
  modalShow: PropTypes.bool.isRequired
}
