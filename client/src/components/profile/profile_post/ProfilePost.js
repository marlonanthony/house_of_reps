import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import InfinteScroll from 'react-infinite-scroll-component'

import {
  getProfilePosts, 
  getMoreProfilePosts 
} from '../../../actions/postActions'
import PostFeed from '../../posts/post_feed/PostFeed'

const ProfilePost = ({
  getProfilePosts,
  getMoreProfilePosts,
  profiles,
  post,
  ...props
}) => {
  const [count] = useState(10),
        [start, setStart] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0) 
    getProfilePosts(count, start, props.match.params.handle)
  }, [getProfilePosts])

  useEffect(() => {
    if(start > 0) {
      getMoreProfilePosts(count, start, props.match.params.handle)
    }
  }, [start])

  const { posts } = post

  return (
    <div id='profile-feed'>
      <InfinteScroll
        dataLength={posts.length}
        next={() => setStart(prev => prev + 1)}
        hasMore={true}
        loader={null}>
        <PostFeed profiles={profiles} posts={posts} />
      </InfinteScroll>
    </div>
  )
}

ProfilePost.propTypes = {
  post: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  getMoreProfilePosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  getProfilePosts,
  getMoreProfilePosts
})(withRouter(ProfilePost))