import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getPostsByHashtag, getMorePostsByHashtag } from '../../actions/postActions'
import PostFeed from '../posts/post_feed/PostFeed'
import './Hashtag.css'

const Hashtag = props => {
  const { posts } = props.post

  useEffect(() => {
    window.scrollTo(0,0)
    if(props.match.params.hashtag) {
      props.getPostsByHashtag(props.match.params.hashtag)
    }
  }, [props.match.params.hashtag])
  
  return (
    <div className='hashtag_route'>
      <PostFeed
        posts={ posts } 
      />
    </div>
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

export default connect(mapStateToProps, {
  getPostsByHashtag,
  getMorePostsByHashtag
})(withRouter(Hashtag))