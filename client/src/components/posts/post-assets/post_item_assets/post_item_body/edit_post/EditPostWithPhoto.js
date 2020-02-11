import React from 'react'
import PropTypes from 'prop-types'

import TextAreaForm from '../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../UI/icons/Icon'

export default function EditPostWithPhoto({
  onSubmit,
  onChange,
  text,
  toggleEmoji,
  modalToggle,
  post
}) {
  return (
    <div>
      <div>
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
  )
}

EditPostWithPhoto.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleEmoji: PropTypes.func.isRequired,
  modalToggle: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}
