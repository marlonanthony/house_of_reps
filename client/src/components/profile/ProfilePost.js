import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import Spinner from '../common/Spinner' 
import { getPosts } from '../../actions/postActions'
import PostItem from '../posts/PostItem'

class ProfilePost extends Component {
  componentDidMount() {
    this.props.getPosts() 
  }

  render() {
    const { posts, loading } = this.props.post 
    let postContent 

    if(posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = posts.map(post => post.user === this.props.auth.user.id 
        ? <PostItem key={post.id} post={post} /> 
        : null)
    }

    return (
      <div className='profile-feed'>
         {postContent}
      </div>
    )
  }
}

ProfilePost.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth 
})

export default connect(mapStateToProps, { getPosts })(ProfilePost) 