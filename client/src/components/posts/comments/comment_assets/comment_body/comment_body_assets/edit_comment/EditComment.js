import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { editedCommentAction } from '../../../../../../../actions/postActions'
import LightBackdrop from '../../../../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../../../../UI/modal/EmojiModal'
import EditCommentWithText from './EditCommentWithText'
import EditCommentWithPhoto from './EditCommentWithPhoto'
import EditCommentWithLink from './EditCommentWithLink'

function EditComment({
  comment,
  modalShow,
  youtubeUrl,
  postId,
  editedCommentAction,
  toggleEditPost
}) {
  const [text, setText] = useState(comment.text || ''),
    [showEmojis, setShowEmojis] = useState(false)

  const onChange = e => setText(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    const { _id } = comment
    const editedComment = { text }
    editedCommentAction(postId, _id, editedComment)
    toggleEditPost()
    setText('')
    e.target.reset()
  }
  const toggleEmoji = () => {
    setShowEmojis(prev => !prev)
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
      {!comment.description &&
      !comment.image &&
      !comment.title &&
      !comment.url &&
      !comment.media ? (
        <EditCommentWithText
          onSubmit={onSubmit}
          onChange={onChange}
          text={text}
          toggleEmoji={toggleEmoji}
        />
      ) : comment.media ? (
        <EditCommentWithPhoto
          onChange={onChange}
          onSubmit={onSubmit}
          text={text}
          toggleEmoji={toggleEmoji}
          modalShow={modalShow}
          comment={comment}
        />
      ) : (
        <EditCommentWithLink
          onSubmit={onSubmit}
          onChange={onChange}
          text={text}
          toggleEmoji={toggleEmoji}
          comment={comment}
          youtubeUrl={youtubeUrl}
        />
      )}
    </>
  )
}

EditComment.propTypes = {
  comment: PropTypes.object.isRequired,
  modalShow: PropTypes.func.isRequired,
  youtubeUrl: PropTypes.string,
  postId: PropTypes.string.isRequired,
  editedCommentAction: PropTypes.func.isRequired,
  toggleEditPost: PropTypes.func.isRequired
}

export default connect(
  null,
  { editedCommentAction }
)(EditComment)
