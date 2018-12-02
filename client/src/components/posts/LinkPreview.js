import React from 'react'

const LinkPreview = ({ post }) => {
  return (
    <div className='post_content' style={{ textAlign: 'center'}}>
      <img src={post.image} style={{ width: '50%', margin: '0 25%' }} />
      <p style={{ fontSize: '12px' }}>{post.title}</p>
      <p style={{ fontSize: '10px' }}>{post.description}</p>
      <a href={'#'}><small>{post.url}</small></a>
    </div>
  )
}

export default LinkPreview
