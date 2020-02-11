import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js'

import TextAreaForm from '../../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../../UI/icons/Icon'
import LightBackdrop from '../../../../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../../../../UI/modal/EmojiModal'

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
                  <p>{comment.title}</p>
                  <p>{comment.description}</p>
                </div>
              </>
            ) : (
              <a
                href={comment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="comment-anchor-container"
              >
                <div id="comment-link-container">
                  <img
                    src={comment.image}
                    alt="thumbnail"
                    id="comment-link-img"
                  />
                  <div id="comment-link-title-desc">
                    <p id="comments-title">{comment.title}</p>
                    <p id="comments-description">{comment.description}</p>
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
