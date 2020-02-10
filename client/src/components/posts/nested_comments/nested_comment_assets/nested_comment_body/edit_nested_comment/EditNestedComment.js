import React from 'react'
import EmojiPicker from 'emoji-picker-react'

import LightBackdrop from '../../../../../UI/backdrop/LightBackdrop'
import Icon from '../../../../../UI/icons/Icon'
import EmojiModal from '../../../../../UI/modal/EmojiModal'
import TextAreaForm from '../../../../../common/textarea/TextAreaForm'

export default function EditNestedComment({
  showEmojis,
  nestedComment,
  text,
  errors,
  editNestedComment,
  addEmoji,
  onChange,
  toggleEmoji,
  youtubeUrl
}) {
  return (
    <>
      <LightBackdrop clicked={this.toggleEmoji} show={showEmojis} />
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
