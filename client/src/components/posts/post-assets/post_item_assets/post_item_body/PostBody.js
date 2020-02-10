import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import JSEMOJI from 'emoji-js'

import { editPostAction } from '../../../../../actions/postActions'
import EditPostBody from './edit_post/EditPostBody'
import DefaultPostBody from './default_post_body/DefaultPostBody'

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

  const addEmoji = emojiName => {
    const jsemoji = new JSEMOJI()
    jsemoji.img_set = 'emojione'
    jsemoji.img_sets.emojione.path =
      'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/'
    jsemoji.supports_css = false
    jsemoji.allow_native = false
    jsemoji.replace_mode = 'unified'
    jsemoji.text_mode = true
    jsemoji.include_title = true
    jsemoji.replace_unified(`:${emojiName}:`)
    jsemoji.replace_colons(`:${emojiName}:`)

    let emoji = String.fromCodePoint(parseInt(emojiName, 16))
    setText(text => text + emoji)
  }

  let youtubeUrl = post.url

  youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be')
    ? (youtubeUrl = post.url
        .replace(/youtu\.be/gi, 'www.youtube.com')
        .replace(/watch\?v=/gi, 'embed/')
        .replace(/&feature=www\.youtube\.com/gi, ''))
    : (youtubeUrl = null)

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
      addEmoji={addEmoji}
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
