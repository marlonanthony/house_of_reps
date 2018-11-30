import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
import Spinner from '../common/Spinner'
import { getPost } from '../../actions/postActions'

class Post extends Component {
  // componentDidMount() {
  //   this.props.getPost(this.props.match.params.id) 
  // }

  render() {
    const { post, loading } = this.props.post 
    let postContent 

    if(post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />
    } else {
      postContent = ( 
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      )
    }

    return (
      <div className='post'>
        <Link to='/feed' className=''>Back To Feed</Link>
        { postContent }
      </div>
    )
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post 
})

export default connect(mapStateToProps, { getPost })(Post) 