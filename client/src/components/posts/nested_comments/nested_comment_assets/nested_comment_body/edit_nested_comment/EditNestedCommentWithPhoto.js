import React from 'react'
import PropTypes from 'prop-types'

import TextAreaForm from '../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../UI/icons/Icon'

export default function EditNestedCommentWithPhoto({
  text,
  onChange,
  toggleEmoji,
  editNestedComment,
  errors,
  nestedComment
}) {
  return (
    <div>
      <div>
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
  )
}

EditNestedCommentWithPhoto.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleEmoji: PropTypes.func.isRequired,
  editNestedComment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  nestedComment: PropTypes.object.isRequired
}
