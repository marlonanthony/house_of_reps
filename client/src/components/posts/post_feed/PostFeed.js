import React from 'react'
import PropTypes from 'prop-types' 
import PostItem from '../post_item/PostItem'


export default function PostFeed(props) {
  const { posts, profiles } = props
  return (
    <div style={{ overflow: 'hidden' }}>
    { posts.map(post => (
      <PostItem 
        key={post._id} 
        post={post} 
        profiles={profiles} 
      />
    ))}
    </div>
  )
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}