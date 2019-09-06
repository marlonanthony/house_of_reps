import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../post_comment_text/PostText'

export default function PostBody({
  post,
  modalShow,
  youtubeUrl
}) {
  return !post.description && !post.image && !post.title && !post.url && !post.media
    ? <PostText postText={post.text} />
    : post.media 
    ? <div>
        <PostText postText={post.text} />
        <img className='postfeed-media-pic' onClick={modalShow} src={post.media} alt="uploaded" />
      </div>
    : <div className='post_content'>
        <PostText postText={post.text} />
        <div>
          { youtubeUrl 
            ? <iframe 
                title='youtube' 
                width="100%" 
                height="300" 
                src={youtubeUrl} 
                frameBorder={0} 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen={true}>
              </iframe>
            : <a href={post.url} target='_blank' rel='noopener noreferrer'>
                <img src={post.image} alt='thumbnail' style={{ width: '100%' }} id='post-link-img' />
              </a> 
          }
          <p style={{textAlign: 'center', fontSize: '12px'}}>{post.title}</p>
          <p style={{textAlign: 'center', fontSize: '12px', padding: '0 5px 20px 5px'}}>{post.description}</p>
        </div>
      </div>
}

PostBody.propTypes = {
  post: PropTypes.object.isRequired,
  modalShow: PropTypes.func.isRequired,
  youtubeUrl: PropTypes.string
}