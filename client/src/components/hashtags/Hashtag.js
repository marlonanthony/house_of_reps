import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import InfinteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'

import {
  getPostsByHashtag,
  getMorePostsByHashtag
} from '../../actions/postActions'
import PostFeed from '../posts/post_feed/PostFeed'
import './Hashtag.css'

const Hashtag = ({
  post,
  getPostsByHashtag,
  getMorePostsByHashtag,
  ...props
}) => {
  const { posts } = post,
    [count] = useState(10),
    [start, setStart] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (props.match.params.hashtag) {
      getPostsByHashtag(props.match.params.hashtag)
      setStart(prevStart => prevStart + 1)
    }
  }, [props.match.params.hashtag, getPostsByHashtag])

  function fetchMore() {
    getMorePostsByHashtag(props.match.params.hashtag, count, start)
    setStart(prevStart => prevStart + 1)
  }

  return (
    posts && (
      <div className="hashtag_route">
        <InfinteScroll
          dataLength={posts.length}
          next={fetchMore}
          hasMore={true}
          loader={null}
        >
          <PostFeed posts={posts} />
        </InfinteScroll>
      </div>
    )
  )
}

Hashtag.propTypes = {
  post: PropTypes.object.isRequired,
  getPostsByHashtag: PropTypes.func.isRequired,
  getMorePostsByHashtag: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  {
    getPostsByHashtag,
    getMorePostsByHashtag
  }
)(Hashtag)
