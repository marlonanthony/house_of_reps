import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import Spinner from '../common/Spinner' 
import { getPosts } from '../../actions/postActions'
import PostItem from '../posts/PostItem'

class ProfilePost extends Component {
  state = {
    showLikes: false 
  }

  componentDidMount() {
    this.props.getPosts() 
    
  }

  render() {
    const { posts, loading } = this.props.post 
    let postContent 
    if(posts === null || loading) {
      postContent = <Spinner />
    } else {
        postContent = posts.map(post => this.props.allProps.match.params.handle === post.handle
        ? <PostItem key={post._id} post={post} /> 
        : null)
    }

    return (
      <div style={{ marginBottom: 70 }}>
         {postContent}
      </div>
    )
  }
}

ProfilePost.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
})

export default connect(mapStateToProps, { getPosts })(ProfilePost) 