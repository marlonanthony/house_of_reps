import React from 'react'

const LinkPreview = ({ post, media }) => {
  if(!post.image)  return <img src={media} alt='preview' style={{width: '100%'}} />
  return (
    <div className='post_content' style={{ textAlign: 'center'}}>
      <img src={post.image} alt={post.title} style={{ width: '50%', margin: '0 25%' }} />
      <p style={{ fontSize: '12px' }}>{post.title}</p>
      <p style={{ fontSize: '10px' }}>{post.description}</p>
    </div>
  )
}

export default LinkPreview
