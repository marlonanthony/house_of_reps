import React from 'react'
import PropTypes from 'prop-types'

import TextAreaForm from '../../../../../common/textarea/TextAreaForm'
import Icon from '../../../../../UI/icons/Icon'
import YouTubeOrLink from '../../../../../common/youtube/YouTubeOrLink'

export default function EditPostWithLink({
  onSubmit,
  onChange,
  text,
  toggleEmoji,
  post,
  youtubeUrl
}) {
  return (
    <div className="post_content">
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
      <YouTubeOrLink value={post} youtubeUrl={youtubeUrl} />
    </div>
  )
}

EditPostWithLink.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleEmoji: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  youtubeUrl: PropTypes.string
}
