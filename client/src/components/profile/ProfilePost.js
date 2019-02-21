import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import InfinteScroll from 'react-infinite-scroll-component'
import Spinner from '../common/Spinner' 
import { getPosts, getMorePosts } from '../../actions/postActions'
import PostItem from '../posts/PostItem'

class ProfilePost extends Component {
  state = {
    showLikes: false,
    // pagination
    count: 30,
    start: 0
  }

  componentDidMount() {
    this.props.getPosts(this.state.count, this.state.start) 
    this.setState(prevState => ({ start: prevState.start + 1 }))
  }

  fetchMore = () => {
    const { count, start } = this.state 
    this.props.getMorePosts(count, start)
    this.setState( prevState => ({ start: prevState.start + 1 }))
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
        <InfinteScroll
        dataLength={posts.length}
        next={this.fetchMore}
        hasMore={true}
        loader={<h4 style={{textAlign: 'center', color: 'cyan'}}>THESE ARE NOT THE POSTS YOU'RE LOOKING FOR</h4>}>
          {postContent}
        </InfinteScroll>
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

export default connect(mapStateToProps, { getPosts, getMorePosts })(ProfilePost) 