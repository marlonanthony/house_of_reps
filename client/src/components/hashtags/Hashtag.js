import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getPostsByHashtag, getMorePostsByHashtag } from '../../actions/postActions'
import PostFeed from '../posts/PostFeed'
import './Hashtag.css'

class Hashtag extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    if(this.props.match.params.hashtag === 'undefined') {
      return this.props.history.push('/feed')
    }
    if(this.props.match.params.hashtag) {
      this.props.getPostsByHashtag(this.props.match.params.hashtag) 
    }
  }
  render() {
    const { posts } = this.props.post
    return (
      <div className='hashtag_route'>
        <PostFeed
          posts={ posts } 
        />
      </div>
    )
  }
}

Hashtag.propTypes = {
  post: PropTypes.object.isRequired,
  getPostsByHashtag: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {
  getPostsByHashtag,
  getMorePostsByHashtag
})(withRouter(Hashtag))