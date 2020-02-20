import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editNestedCommentAction } from '../../../../../actions/postActions'
import { youTubeURL } from '../../../../../utils/youtube_url/youTubeUrl'
import DefaultNestedCommentBody from './default_nested_comment_body/DefaultNestedCommentBody'
import EditNestedComment from './edit_nested_comment/EditNestedComment'
import './NestedCommentBody.css'

function NestedCommentBody({
  comment,
  nestedComment,
  postId,
  editPost,
  toggleEditPost,
  editNestedCommentAction
}) {
  let youtubeUrl = nestedComment.url
  youtubeUrl = youTubeURL(youtubeUrl)

  return !editPost ? (
    <DefaultNestedCommentBody
      nestedComment={nestedComment}
      youtubeUrl={youtubeUrl}
    />
  ) : (
    <EditNestedComment
      nestedComment={nestedComment}
      youtubeUrl={youtubeUrl}
      comment={comment}
      postId={postId}
      toggleEditPost={toggleEditPost}
      editNestedCommentAction={editNestedCommentAction}
    />
  )
}

NestedCommentBody.propTypes = {
  comment: PropTypes.object.isRequired,
  nestedComment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  editPost: PropTypes.bool.isRequired,
  toggleEditPost: PropTypes.func.isRequired,
  editNestedCommentAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { editNestedCommentAction }
)(NestedCommentBody)
