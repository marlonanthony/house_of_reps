import React from 'react'

import PostText from '../../../post-assets/text/PostText'
import './CommentBody.css'

export default function CommentBody({ comment, modalShow }) {
  let youtubeUrl = comment.url
  youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
    ? youtubeUrl = comment.url.replace(/youtu\.be/gi, 'www.youtube.com')
                              .replace(/watch\?v=/gi, 'embed/')
                              .replace(/&feature=www\.youtube\.com/gi, '')
    : youtubeUrl = null

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
              ? <>
                  <iframe
                    title='youtube' 
                    width="100%" height="300" 
                    src={youtubeUrl} frameBorder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen={true}>
                  </iframe>
                  <div className='youtube_link_title_desc_wrapper'>
                    <p>{comment.title}</p>
                    <p>{comment.description}</p>
                  </div>
                </>
              : <a 
                  href={comment.url} target='_blank' 
                  rel='noopener noreferrer' 
                  className='comment-anchor-container'>
                  <div id='comment-link-container'>
                    <img src={comment.image} alt='thumbnail' id='comment-link-img' />
                    <div id='comment-link-title-desc'>
                      <p id='comments-title'>{comment.title}</p>
                      <p id='comments-description'>{comment.description}</p>
                    </div>
                  </div>
                </a>
            }
          </div>
      </div>
}
