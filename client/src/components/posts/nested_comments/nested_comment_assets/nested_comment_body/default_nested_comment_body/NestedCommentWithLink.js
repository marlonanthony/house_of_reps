import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../../../../post-assets/text/PostText'
import YouTubeOrLink from '../../../../../common/youtube/YouTubeOrLink'

export default function NestedCommentWithLink({ nestedComment, youtubeUrl }) {
  return (
    <div className="comment-wrapper">
      <PostText fontSize="13px" postText={nestedComment.text} />
      <YouTubeOrLink value={nestedComment} youtubeUrl={youtubeUrl} />
    </div>
  )
}

NestedCommentWithLink.propTypes = {
  nestedComment: PropTypes.object.isRequired,
  youtubeUrl: PropTypes.string
}
