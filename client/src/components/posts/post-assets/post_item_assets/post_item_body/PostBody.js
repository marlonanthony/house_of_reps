import React from 'react'
import PropTypes from 'prop-types'

import EditPostBody from './edit_post/EditPostBody'
import DefaultPostBody from './default_post_body/DefaultPostBody'
import { youTubeURL } from '../../../../../utils/youTubeUrl'

const PostBody = ({ post, editPost, toggleEditPost, modalToggle }) => {
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
      toggleEditPost={toggleEditPost}
    />
  )
}

PostBody.propTypes = {
  post: PropTypes.object.isRequired,
  modalToggle: PropTypes.func.isRequired,
  editPost: PropTypes.bool.isRequired,
  toggleEditPost: PropTypes.func.isRequired
}

export default PostBody
