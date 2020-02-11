import React from 'react'
import PropTypes from 'prop-types'

import { youTubeURL } from '../../../../../utils/youTubeUrl'
import DefaultCommentBody from './comment_body_assets/default_comment_body/DefaultCommentBody'
import EditComment from './comment_body_assets/edit_comment/EditComment'
import './CommentBody.css'

function CommentBody({ comment, modalShow, editPost, toggleEditPost, postId }) {
  let youtubeUrl = comment.url
  youtubeUrl = youTubeURL(youtubeUrl)

  return !editPost ? (
    <DefaultCommentBody
      comment={comment}
      modalShow={modalShow}
      youtubeUrl={youtubeUrl}
    />
  ) : (
    <EditComment
      comment={comment}
      modalShow={modalShow}
      youtubeUrl={youtubeUrl}
      postId={postId}
      toggleEditPost={toggleEditPost}
    />
  )
}

CommentBody.propTypes = {
  comment: PropTypes.object.isRequired,
  modalShow: PropTypes.func.isRequired,
  editPost: PropTypes.bool.isRequired,
  toggleEditPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

export default CommentBody
