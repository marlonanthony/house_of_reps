import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js'

import LightBackdrop from '../../../../../UI/backdrop/LightBackdrop'
import Icon from '../../../../../UI/icons/Icon'
import EmojiModal from '../../../../../UI/modal/EmojiModal'
import TextAreaForm from '../../../../../common/textarea/TextAreaForm'

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

  const editNestedComment = e => {
    e.preventDefault()
    const { _id } = comment
    const editedNestedComment = { text }
    editNestedCommentAction(postId, _id, nestedComment._id, editedNestedComment)
    toggleEditPost()
    setText('')
    e.target.reset()
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
        <div style={{ position: 'relative' }}>
          <form onSubmit={editNestedComment}>
            <TextAreaForm
              placeholder="Edit comment"
              name="text"
              value={text}
              onChange={onChange}
              autoFocus
              fontSize="14px"
              error={errors.text}
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
      ) : nestedComment.media ? (
        <div>
          <div style={{ position: 'relative' }}>
            <form>
              <TextAreaForm
                placeholder="Edit comment"
                name="text"
                value={text}
                onChange={onChange}
                autoFocus
                fontSize="14px"
                error={errors.text}
              />
              <div className="edit_icon_container">
                <Icon
                  icon="far fa-smile-wink"
                  title="emojis"
                  toggleIcon={toggleEmoji}
                />
                <Icon
                  icon="far fa-paper-plane"
                  title="submit"
                  toggleIcon={editNestedComment}
                />
              </div>
            </form>
          </div>
          <img
            src={nestedComment.media}
            alt="uploaded"
            className="comments_image"
          />
        </div>
      ) : (
        <div className="comment-wrapper">
          <div style={{ position: 'relative' }}>
            <form onSubmit={editNestedComment}>
              <TextAreaForm
                placeholder="Edit comment"
                name="text"
                value={text}
                onChange={onChange}
                autoFocus
                fontSize="14px"
                error={errors.text}
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
          <div>
            {youtubeUrl ? (
              <>
                <iframe
                  title="youtube"
                  width="100%"
                  height="300"
                  src={youtubeUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                ></iframe>
                <div className="youtube_link_title_desc_wrapper">
                  <p>{nestedComment.title}</p>
                  <p>{nestedComment.description}</p>
                </div>
              </>
            ) : (
              <a
                href={nestedComment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="comment-anchor-container"
              >
                <div id="comment-link-container">
                  <img
                    src={nestedComment.image}
                    alt="thumbnail"
                    id="comment-link-img"
                  />
                  <div id="comment-link-title-desc">
                    <p id="comments-title">{nestedComment.title}</p>
                    <p id="comments-description">{nestedComment.description}</p>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      )}
    </>
  )
}
