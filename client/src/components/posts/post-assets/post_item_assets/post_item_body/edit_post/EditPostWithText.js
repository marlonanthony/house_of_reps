import React from 'react'
import PropTypes from 'prop-types'

import TextAreaForm from '../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../UI/icons/Icon'

export default function EditPostWithText({
  onSubmit,
  onChange,
  text,
  toggleEmoji
}) {
  return (
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
  )
}

EditPostWithText.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleEmoji: PropTypes.func.isRequired
}
