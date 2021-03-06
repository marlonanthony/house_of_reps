import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InfinteScroll from 'react-infinite-scroll-component'
import PostForm from '../../posts/post_form/PostForm'

import {
  getProfilePosts,
  getMoreProfilePosts
} from '../../../actions/postActions'
import PostFeed from '../../posts/post_feed/PostFeed'

const ProfilePost = ({
  getProfilePosts,
  getMoreProfilePosts,
  post,
  handle
}) => {
  const [count] = useState(10),
    [start, setStart] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    getProfilePosts(10, 0, handle)
  }, [getProfilePosts, handle])

  useEffect(() => {
    if (start > 0) {
      getMoreProfilePosts(count, start, handle)
    }
  }, [start, count, getMoreProfilePosts])

  const { posts } = post
  return (
    <div id="profile-feed">
      <PostForm />
      <br />
      <InfinteScroll
        dataLength={posts.length}
        next={() => setStart(prev => prev + 1)}
        hasMore={true}
        loader={null}
      >
        <PostFeed posts={posts} />
      </InfinteScroll>
    </div>
  )
}

ProfilePost.propTypes = {
  post: PropTypes.object.isRequired,
  getMoreProfilePosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    getProfilePosts,
    getMoreProfilePosts
  }
)(ProfilePost)
