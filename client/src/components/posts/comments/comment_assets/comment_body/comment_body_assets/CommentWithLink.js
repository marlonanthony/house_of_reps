import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../../../../post-assets/text/PostText'
import YouTubeOrLink from '../../../../../common/youtube/YouTubeOrLink'

export default function CommentWithLink({ comment, youtubeUrl }) {
  return (
    <div className="comment-wrapper">
      <PostText fontSize="13px" postText={comment.text} />
      <YouTubeOrLink value={comment} youtubeUrl={youtubeUrl} />
    </div>
  )
}

CommentWithLink.propTypes = {
  youtubeUrl: PropTypes.string,
  comment: PropTypes.object.isRequired
}
