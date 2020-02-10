import React from 'react'
import PostText from '../../../text/PostText'

export default function PostWithLink({ post, youtubeUrl }) {
  return (
    <div className="post_content">
      <PostText postText={post.text} />
      <div>
        {youtubeUrl ? (
          <iframe
            title="youtube"
            width="100%"
            height="300"
            src={youtubeUrl}
            frameBorder={0}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        ) : (
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            <img
              src={post.image}
              alt="thumbnail"
              style={{ width: '100%' }}
              id="post-link-img"
            />
          </a>
        )}
        <p style={{ textAlign: 'center', fontSize: '12px' }}>{post.title}</p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            padding: '0 5px 20px 5px'
          }}
        >
          {post.description}
        </p>
      </div>
    </div>
  )
}
