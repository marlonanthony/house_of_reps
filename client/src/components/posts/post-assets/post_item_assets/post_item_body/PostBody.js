import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { editPostAction } from '../../../../../actions/postActions'
import EditPostBody from './edit_post/EditPostBody'
import DefaultPostBody from './default_post_body/DefaultPostBody'
import { youTubeURL } from '../../../../../utils/youTubeUrl'

const PostBody = ({
  post,
  editPostAction,
  editPost,
  toggleEditPost,
  modalToggle
}) => {
  let youtubeUrl = post.url
  youtubeUrl = youTubeURL(youtubeUrl)

  return !editPost ? (
    <DefaultPostBody
      post={post}
      modalToggle={modalToggle}
      youtubeUrl={youtubeUrl}
    />
  ) : (
    <EditPostBody
      post={post}
      modalToggle={modalToggle}
      youtubeUrl={youtubeUrl}
      editPostAction={editPostAction}
      toggleEditPost={toggleEditPost}
    />
  )
}

PostBody.propTypes = {
  post: PropTypes.object.isRequired,
  modalToggle: PropTypes.func.isRequired,
  editPost: PropTypes.bool.isRequired,
  editPostAction: PropTypes.func.isRequired,
  toggleEditPost: PropTypes.func.isRequired
}

export default connect(
  null,
  { editPostAction }
)(PostBody)
