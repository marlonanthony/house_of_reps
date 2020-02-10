import React from 'react'
import PostText from '../../../text/PostText'
import YouTubeOrLink from '../../../../../common/youtube/YouTubeOrLink'

export default function PostWithLink({ post, youtubeUrl }) {
  return (
    <div className="post_content">
      <PostText postText={post.text} />
      <YouTubeOrLink value={post} youtubeUrl={youtubeUrl} />
    </div>
  )
}
