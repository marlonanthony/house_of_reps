import React from 'react'

import PostText from '../../../post-assets/text/PostText'
import './NestedCommentBody.css'

const NestedCommentBody = ({ nestedComment }) => {
  let youtubeUrl = nestedComment.url
  youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
    ? youtubeUrl = nestedComment.url.replace(/youtu\.be/gi, 'www.youtube.com')
                              .replace(/watch\?v=/gi, 'embed/')
                              .replace(/&feature=www\.youtube\.com/gi, '')
    : youtubeUrl = null

  return (
  !nestedComment.description && !nestedComment.image && !nestedComment.title && !nestedComment.url && !nestedComment.media
    ? <PostText fontSize='13px' postText={nestedComment.text} />
    : nestedComment.media
      ? <div> {/* <div onClick={modalShow}> */}
          <PostText fontSize='13px' postText={nestedComment.text} />
          <img src={nestedComment.media} alt="uploaded" className='comments_image' />
        </div>
      : <div className='comment-wrapper'>
          <PostText fontSize='13px' postText={nestedComment.text} />
          <div>
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
                    <p>{nestedComment.title}</p>
                    <p>{nestedComment.description}</p>
                  </div>
                </>
              : <a 
                  href={nestedComment.url} target='_blank' 
                  rel='noopener noreferrer' 
                  className='comment-anchor-container'>
                  <div id='comment-link-container'>
                    <img src={nestedComment.image} alt='thumbnail' id='comment-link-img' />
                    <div id='comment-link-title-desc'>
                      <p id='comments-title'>{nestedComment.title}</p>
                      <p id='comments-description'>{nestedComment.description}</p>
                    </div>
                  </div>
                </a>
            }
          </div>
    </div>
  )
}

export default NestedCommentBody