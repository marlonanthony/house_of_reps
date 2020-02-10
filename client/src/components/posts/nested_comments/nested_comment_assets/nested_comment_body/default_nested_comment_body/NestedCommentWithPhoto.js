import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../../../../post-assets/text/PostText'

export default function NestedCommentWithPhoto({ nestedComment }) {
  return (
    <div>
      <PostText fontSize="13px" postText={nestedComment.text} />
      <img
        src={nestedComment.media}
        alt="uploaded"
        className="comments_image"
      />
    </div>
  )
}

NestedCommentWithPhoto.propTypes = {
  nestedComment: PropTypes.object.isRequired
}
