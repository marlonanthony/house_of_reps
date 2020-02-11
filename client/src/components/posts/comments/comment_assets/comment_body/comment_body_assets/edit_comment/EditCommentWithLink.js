import React from 'react'
import PropTypes from 'prop-types'

import TextAreaForm from '../../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../../UI/icons/Icon'
import YouTubeOrLink from '../../../../../../common/youtube/YouTubeOrLink'

export default function EditCommentWithLink({
  onSubmit,
  onChange,
  text,
  toggleEmoji,
  comment,
  youtubeUrl
}) {
  return (
    <div className="comment-wrapper">
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
      <YouTubeOrLink value={comment} youtubeUrl={youtubeUrl} />
    </div>
  )
}

EditCommentWithLink.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleEmoji: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  youtubeUrl: PropTypes.string
}
