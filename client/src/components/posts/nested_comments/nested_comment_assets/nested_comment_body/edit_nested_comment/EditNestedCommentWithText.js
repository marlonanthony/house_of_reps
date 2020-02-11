import React from 'react'
import PropTypes from 'prop-types'

import TextAreaForm from '../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../UI/icons/Icon'

export default function EditNestedCommentWithText({
  editNestedComment,
  text,
  onChange,
  toggleEmoji,
  errors
}) {
  return (
    <div>
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
  )
}

EditNestedCommentWithText.propTypes = {
  editNestedComment: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleEmoji: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}
