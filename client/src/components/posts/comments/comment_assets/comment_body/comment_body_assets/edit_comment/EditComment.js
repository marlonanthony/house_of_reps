import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js'

import TextAreaForm from '../../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../../UI/icons/Icon'
import LightBackdrop from '../../../../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../../../../UI/modal/EmojiModal'
import YouTubeOrLink from '../../../../../../common/youtube/YouTubeOrLink'

export default function EditComment({
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
        <div style={{ position: 'relative' }}>
          <form onSubmit={onSubmit}>
            <TextAreaForm
              placeholder="Edit comment"
              name="text"
              value={text}
              onChange={onChange}
              autoFocus
              fontSize="14px"
            />
            <div className="edit_icon_container">
              <Icon
                icon="far fa-smile-wink"
                title="emojis"
                toggleIcon={toggleEmoji}
              />
              <button type="submit" className="comment_form_btns">
                <Icon icon="far fa-paper-plane" title="submit" />
              </button>
            </div>
          </form>
        </div>
      ) : comment.media ? (
        <div>
          <div style={{ position: 'relative' }}>
            <form onSubmit={onSubmit}>
              <TextAreaForm
                placeholder="Edit comment"
                name="text"
                value={text}
                onChange={onChange}
                autoFocus
                fontSize="14px"
              />
              <div className="edit_icon_container">
                <Icon
                  icon="far fa-smile-wink"
                  title="emojis"
                  toggleIcon={toggleEmoji}
                />
                <button type="submit" className="comment_form_btns">
                  <Icon icon="far fa-paper-plane" title="submit" />
                </button>
              </div>
            </form>
          </div>
          <img
            onClick={modalShow}
            src={comment.media}
            alt="uploaded"
            className="comments_image"
          />
        </div>
      ) : (
        <div className="comment-wrapper">
          <div style={{ position: 'relative' }}>
            <form onSubmit={onSubmit}>
              <TextAreaForm
                placeholder="Edit comment"
                name="text"
                value={text}
                onChange={onChange}
                autoFocus
                fontSize="14px"
              />
              <div className="edit_icon_container">
                <Icon
                  icon="far fa-smile-wink"
                  title="emojis"
                  toggleIcon={toggleEmoji}
                />
                <button type="submit" className="comment_form_btns">
                  <Icon icon="far fa-paper-plane" title="submit" />
                </button>
              </div>
            </form>
          </div>
          <YouTubeOrLink value={comment} youtubeUrl={youtubeUrl} />
        </div>
      )}
    </>
  )
}
