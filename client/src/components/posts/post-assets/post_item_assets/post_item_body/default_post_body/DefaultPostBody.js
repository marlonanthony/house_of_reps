import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../../../text/PostText'
import PostWithPhoto from './PostWithPhoto'
import PostWithLink from './PostWithLink'

export default function DefaultPostBody({ post, modalToggle, youtubeUrl }) {
  return !post.description &&
    !post.image &&
    !post.title &&
    !post.url &&
    !post.media ? (
    <PostText postText={post.text} />
  ) : post.media ? (
    <PostWithPhoto post={post} modalToggle={modalToggle} />
  ) : (
    <PostWithLink post={post} youtubeUrl={youtubeUrl} />
  )
}

DefaultPostBody.propTypes = {
  post: PropTypes.object.isRequired,
  modalToggle: PropTypes.func.isRequired,
  youtubeUrl: PropTypes.string
}
