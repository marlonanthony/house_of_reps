import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 

import PostForm from './PostForm' 
import Spinner from '../common/Spinner' 
import { getPosts } from '../../actions/postActions'
import { getCurrentProfile } from '../../actions/profileActions'
import PostFeed from './PostFeed'
import './Posts.css'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts() 
    this.props.getCurrentProfile()
  }

  render() {
    const { posts, loading } = this.props.post 
    const { profile } = this.props.profile 
    let postContent 
    let profileContent

    if(profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div style={{ background: 'white', margin: 'auto', border: 'none', maxWidth: '200px', height: '100px' }}>
          <img style={{width: '100%', height: '50px' }} src={require('../../img/skyline.jpg')} alt='background-img' />
          <div style={{display: 'flex', justifyContent: 'space-around', padding: '7px' }}>
            <img id='posts-profile-img'src={profile.avatar} alt={profile.name} />
            <p style={{marginTop: '-10px'}}>@{profile.handle}</p>
          </div>
        </div>
      )
    }

    if(posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = <PostFeed posts={posts} />
    }

    return (
      <div className='feed'>
        <div className='post-feed-profile'>
          { profileContent }
        </div>
        <div className='post-feed-form'><PostForm style={{display: 'grid', justifySelf: 'center'}} /></div>
        <div className='post-feed-post-content'>{postContent}</div>
        <div className='post-feed-footer'>
          <footer id='postsfeed-footer'>
            Copyright &copy; 2018 House of Reps
          </footer>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
})

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts) 