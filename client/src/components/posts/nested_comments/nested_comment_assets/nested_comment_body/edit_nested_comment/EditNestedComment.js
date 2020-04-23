import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import PropTypes from 'prop-types'

import LightBackdrop from '../../../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../../../UI/modal/emoji-modal/EmojiModal'
import EditNestedCommentWithPhoto from './EditNestedCommentWithPhoto'
import EditNestedCommentWithLink from './EditNestedCommentWithLink'
import EditNestedCommentWithText from './EditNestedCommentWithText'

export default function EditNestedComment({
  nestedComment,
  toggleEditPost,
  editNestedCommentAction,
  comment,
  postId,
  youtubeUrl
}) {
  const [errors, setErrors] = useState({}),
    [text, setText] = useState(nestedComment.text || ''),
    [showEmojis, setShowEmojis] = useState(false)

  const toggleEmoji = () => {
    setShowEmojis(prev => !prev)
  }

  const onChange = e => setText(e.target.value)

  const addEmoji = (e, emojiObject) => {
    setText(prevText => prevText + emojiObject.emoji)
  }

  const editNestedComment = e => {
    e.preventDefault()
    const { _id } = comment
    const editedNestedComment = { text }
    editNestedCommentAction(postId, _id, nestedComment._id, editedNestedComment)
    toggleEditPost()
    setText('')
  }

  return (
    <>
      <LightBackdrop clicked={toggleEmoji} show={showEmojis} />
      {showEmojis && (
        <EmojiModal>
          <EmojiPicker onEmojiClick={addEmoji} />
        </EmojiModal>
      )}
      {!nestedComment.description &&
      !nestedComment.image &&
      !nestedComment.title &&
      !nestedComment.url &&
      !nestedComment.media ? (
        <EditNestedCommentWithText
          editNestedComment={editNestedComment}
          text={text}
          onChange={onChange}
          toggleEmoji={toggleEmoji}
          errors={errors}
        />
      ) : nestedComment.media ? (
        <EditNestedCommentWithPhoto
          text={text}
          onChange={onChange}
          toggleEmoji={toggleEmoji}
          editNestedComment={editNestedComment}
          errors={errors}
          nestedComment={nestedComment}
        />
      ) : (
        <EditNestedCommentWithLink
          editNestedComment={editNestedComment}
          text={text}
          onChange={onChange}
          toggleEmoji={toggleEmoji}
          errors={errors}
          youtubeUrl={youtubeUrl}
          nestedComment={nestedComment}
        />
      )}
    </>
  )
}

EditNestedComment.propTypes = {
  nestedComment: PropTypes.object.isRequired,
  toggleEditPost: PropTypes.func.isRequired,
  editNestedCommentAction: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  youtubeUrl: PropTypes.string
}
