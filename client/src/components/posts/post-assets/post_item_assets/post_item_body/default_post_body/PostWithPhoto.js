import React from 'react'
import PostText from '../../../text/PostText'

export default function PostWithPhoto({ post, modalToggle }) {
  return (
    <div>
      <PostText postText={post.text} />
      <img
        className="postfeed-media-pic"
        onClick={modalToggle}
        src={post.media}
        alt="uploaded"
      />
    </div>
  )
}
