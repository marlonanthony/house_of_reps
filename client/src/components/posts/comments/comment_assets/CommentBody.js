import React from 'react'

import PostText from '../../post-assets/text/PostText'

export default function CommentBody({ comment, modalShow, youtubeUrl }) {
  return !comment.description && !comment.image && !comment.title && !comment.url && !comment.media
    ? <PostText fontSize='13px' postText={comment.text} />
    : comment.media
      ? <div onClick={modalShow}>
          <PostText fontSize='13px' postText={comment.text} />
          <img src={comment.media} alt="uploaded" className='comments_image' />
        </div>
      : <div className='comment-wrapper'>
          <PostText fontSize='13px' postText={comment.text} />
          <div style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
            { youtubeUrl 
              ? <iframe 
                  title='youtube' 
                  width="100%" height="300" 
                  src={youtubeUrl} frameBorder="0" 
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen={true}>
                </iframe>
              : <a 
                  href={comment.url} target='_blank' 
                  rel='noopener noreferrer' 
                  id='comment-anchor-container'>
                  <div id='comment-link-container'>
                    <img src={comment.image} alt='thumbnail' id='comment-link-img' />
                    <div id='comments-grandson'>
                      <p id='comments-title'>{comment.title}</p>
                      <p id='comments-description'>{comment.description}</p>
                    </div>
                  </div>
                </a>
            }
          </div>
      </div>
}
