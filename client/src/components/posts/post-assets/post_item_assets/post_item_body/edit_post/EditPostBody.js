import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { editPostAction } from '../../../../../../actions/postActions'
import LightBackdrop from '../../../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../../../UI/modal/EmojiModal'
import EditPostWithText from './EditPostWithText'
import EditPostWithPhoto from './EditPostWithPhoto'
import EditPostWithLink from './EditPostWithLink'

const EditPostBody = ({
  post,
  modalToggle,
  youtubeUrl,
  editPostAction,
  toggleEditPost
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
    setText(prevText => prevText + emoji)
  }
  return (
    <>
      <LightBackdrop clicked={toggleEmoji} show={showEmojis} />
      {showEmojis && (
        <EmojiModal>
          <EmojiPicker onEmojiClick={addEmoji} />
        </EmojiModal>
      )}
      {!post.description &&
      !post.image &&
      !post.title &&
      !post.url &&
      !post.media ? (
        <EditPostWithText
          onSubmit={onSubmit}
          onChange={onChange}
          text={text}
          toggleEmoji={toggleEmoji}
        />
      ) : post.media ? (
        <EditPostWithPhoto
          onSubmit={onSubmit}
          onChange={onChange}
          text={text}
          toggleEmoji={toggleEmoji}
          modalToggle={modalToggle}
          post={post}
        />
      ) : (
        <EditPostWithLink
          onSubmit={onSubmit}
          onChange={onChange}
          text={text}
          toggleEmoji={toggleEmoji}
          post={post}
          youtubeUrl={youtubeUrl}
        />
      )}
    </>
  )
}

EditPostBody.propTypes = {
  post: PropTypes.object.isRequired,
  modalToggle: PropTypes.func.isRequired,
  youtubeUrl: PropTypes.string,
  editPostAction: PropTypes.func.isRequired,
  toggleEditPost: PropTypes.func.isRequired
}

export default connect(
  null,
  { editPostAction }
)(EditPostBody)
