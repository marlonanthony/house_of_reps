import React, { useState } from 'react'
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
  const [text, setText] = useState(post.text || ''),
    [showEmojis, setShowEmojis] = useState(false)

  const onChange = e => setText(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    const { _id } = post
    const editedPost = { text }

    editPostAction(_id, editedPost)
    setText('')
    toggleEditPost()
    e.target.reset()
  }

  const toggleEmoji = () => {
    setShowEmojis(p => !p)
  }

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
      showEmojis={showEmojis}
      toggleEmoji={toggleEmoji}
      setText={setText}
      onSubmit={onSubmit}
      post={post}
      onChange={onChange}
      text={text}
      modalToggle={modalToggle}
      youtubeUrl={youtubeUrl}
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
