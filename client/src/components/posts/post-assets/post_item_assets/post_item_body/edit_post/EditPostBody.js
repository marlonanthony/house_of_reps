import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js'
import PropTypes from 'prop-types'

import TextAreaForm from '../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../UI/icons/Icon'
import LightBackdrop from '../../../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../../../UI/modal/EmojiModal'

const EditPostBody = ({
  showEmojis,
  toggleEmoji,
  onSubmit,
  post,
  onChange,
  text,
  modalToggle,
  youtubeUrl,
  setText
}) => {
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
        <div style={{ position: 'relative' }}>
          <form onSubmit={onSubmit}>
            <TextAreaForm
              placeholder="Edit post"
              name="text"
              value={text}
              onChange={onChange}
              autoFocus
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
      ) : post.media ? (
        <div>
          <div style={{ position: 'relative' }}>
            <form onSubmit={onSubmit}>
              <TextAreaForm
                placeholder="Edit post"
                name="text"
                value={text}
                onChange={onChange}
                autoFocus
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
            className="postfeed-media-pic"
            onClick={modalToggle}
            src={post.media}
            alt="uploaded"
          />
        </div>
      ) : (
        <div className="post_content">
          <div style={{ position: 'relative' }}>
            <form onSubmit={onSubmit}>
              <TextAreaForm
                placeholder="Edit post"
                name="text"
                value={text}
                onChange={onChange}
                autoFocus
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
              <iframe
                title="youtube"
                width="100%"
                height="300"
                src={youtubeUrl}
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            ) : (
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={post.image}
                  alt="thumbnail"
                  style={{ width: '100%' }}
                  id="post-link-img"
                />
              </a>
            )}
            <p style={{ textAlign: 'center', fontSize: '12px' }}>
              {post.title}
            </p>
            <p
              style={{
                textAlign: 'center',
                fontSize: '12px',
                padding: '0 5px 20px 5px'
              }}
            >
              {post.description}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

EditPostBody.propTypes = {
  showEmojis: PropTypes.bool.isRequired,
  toggleEmoji: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  modalToggle: PropTypes.func.isRequired,
  youtubeUrl: PropTypes.string
}

export default EditPostBody
