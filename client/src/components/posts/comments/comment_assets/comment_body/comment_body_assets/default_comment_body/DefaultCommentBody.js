import React from 'react'
import PropTypes from 'prop-types'

import CommentWithPhoto from '../CommentWithPhoto'
import PostText from '../../../../../post-assets/text/PostText'
import CommentWithLink from '../CommentWithLink'

export default function DefaultCommentBody({ comment, modalShow, youtubeUrl }) {
  return !comment.description &&
    !comment.image &&
    !comment.title &&
    !comment.url &&
    !comment.media ? (
    <PostText fontSize="13px" postText={comment.text} />
  ) : comment.media ? (
    <CommentWithPhoto comment={comment} modalShow={modalShow} />
  ) : (
    <CommentWithLink comment={comment} youtubeUrl={youtubeUrl} />
  )
}

DefaultCommentBody.propTypes = {
  comment: PropTypes.object.isRequired,
  modalShow: PropTypes.func.isRequired,
  youtubeUrl: PropTypes.string
}
