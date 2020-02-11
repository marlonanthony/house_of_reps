import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import JSEMOJI from 'emoji-js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { editPostAction } from '../../../../../../actions/postActions'
import TextAreaForm from '../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../UI/icons/Icon'
import LightBackdrop from '../../../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../../../UI/modal/EmojiModal'
import YouTubeOrLink from '../../../../../common/youtube/YouTubeOrLink'

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
          <YouTubeOrLink value={post} youtubeUrl={youtubeUrl} />
        </div>
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
