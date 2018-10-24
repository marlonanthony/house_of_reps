import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 

import PostForm from './PostForm' 
import Spinner from '../common/Spinner' 
import { getPosts } from '../../actions/postActions'
import PostFeed from './PostFeed'
// import Profiles from '../profiles/Profiles'
import './Posts.css'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts() 
  }

  render() {
    const { posts, loading } = this.props.post 
    let postContent 

    if(posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = <PostFeed posts={posts} />
    }

    return (
      <div className='feed'>
        {/* <Profiles /> */}
        <div style={{ marginBottom: '200px' }}></div>
        <PostForm />
        {postContent}
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts) 