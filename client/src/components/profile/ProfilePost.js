import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import InfinteScroll from 'react-infinite-scroll-component'
import { getPosts, getMorePosts, getProfilePosts, getMoreProfilePosts } from '../../actions/postActions'
import PostItem from '../posts/PostItem'
import PostFeed from '../posts/PostFeed'

class ProfilePost extends Component {
  state = {
    showLikes: false,
    // pagination
    count: 10,
    start: 0
  }

  componentDidMount() {
    const { count, start } = this.state 
    window.scrollTo(0, 0) 
    this.props.getProfilePosts(count, start, this.props.match.params.handle) 
    this.setState(prevState => ({ start: prevState.start + 1 }))
  }

  fetchMore = () => {
    const { count, start } = this.state 
    this.props.getMoreProfilePosts(count, start) 
    this.setState( prevState => ({ start: prevState.start + 1 }))
  }

  render() {
    const { posts, loading } = this.props.post 
    let postContent 
    if(posts === null || loading) {
      postContent = null
    } else {
      // postContent = posts.map(post => <PostItem key={post._id} post={post} />)
      postContent = <PostFeed posts={posts} />
    }


    return (
      <div style={{ marginBottom: 70 }}>
        {/* <InfinteScroll
        dataLength={posts.length}
        next={this.fetchMore}
        hasMore={true}
        loader={null}> */}
          {postContent}
        {/* </InfinteScroll> */}
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

export default connect(mapStateToProps, { getPosts, getMorePosts, getProfilePosts, getMoreProfilePosts })(withRouter(ProfilePost))