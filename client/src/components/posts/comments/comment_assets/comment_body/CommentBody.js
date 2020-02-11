import React from 'react'
import { connect } from 'react-redux'

import { editedCommentAction } from '../../../../../actions/postActions'
import { youTubeURL } from '../../../../../utils/youTubeUrl'
import DefaultCommentBody from './comment_body_assets/default_comment_body/DefaultCommentBody'
import EditComment from './comment_body_assets/edit_comment/EditComment'
import './CommentBody.css'

function CommentBody({
  comment,
  modalShow,
  editPost,
  toggleEditPost,
  postId,
  editedCommentAction
}) {
  let youtubeUrl = comment.url
  youtubeUrl = youTubeURL(youtubeUrl)

  if (!editPost) {
    return (
      <DefaultCommentBody
        comment={comment}
        modalShow={modalShow}
        youtubeUrl={youtubeUrl}
      />
    )
  } else {
    return (
      <EditComment
        comment={comment}
        modalShow={modalShow}
        youtubeUrl={youtubeUrl}
        postId={postId}
        editedCommentAction={editedCommentAction}
        toggleEditPost={toggleEditPost}
      />
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { editedCommentAction }
)(CommentBody)
