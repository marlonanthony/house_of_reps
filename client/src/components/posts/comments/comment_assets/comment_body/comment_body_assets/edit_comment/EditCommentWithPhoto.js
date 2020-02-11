import React from 'react'

import TextAreaForm from '../../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../../UI/icons/Icon'

export default function EditCommentWithPhoto({
  onChange,
  onSubmit,
  text,
  toggleEmoji,
  modalShow,
  comment
}) {
  return (
    <div>
      <div>
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
  )
}
