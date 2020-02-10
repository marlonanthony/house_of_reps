import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../../../../post-assets/text/PostText'
import NestedCommentWithPhoto from './NestedCommentWithPhoto'
import NestedCommentWithLink from './NestedCommentWithLink'

export default function DefaultNestedCommentBody({
  nestedComment,
  youtubeUrl
}) {
  return !nestedComment.description &&
    !nestedComment.image &&
    !nestedComment.title &&
    !nestedComment.url &&
    !nestedComment.media ? (
    <PostText fontSize="13px" postText={nestedComment.text} />
  ) : nestedComment.media ? (
    <NestedCommentWithPhoto nestedComment={nestedComment} />
  ) : (
    <NestedCommentWithLink
      nestedComment={nestedComment}
      youtubeUrl={youtubeUrl}
    />
  )
}

DefaultNestedCommentBody.propTypes = {
  nestedComment: PropTypes.object.isRequired,
  youtubeUrl: PropTypes.string
}
