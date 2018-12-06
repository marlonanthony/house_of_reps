import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import PostItem from './PostItem'


class PostFeed extends Component {

  // state = {
  //   posts: this.props.posts 
  // }

  // componentDidMount() {
  //   console.log(this.props.posts)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.posts !== this.props.posts) {
  //     this.setState(prevProps => ({ posts: prevProps.posts }))
  //   }
  // }

  render() {
    const { posts } = this.props
    return posts.map(post => <PostItem key={post._id} post={post} /> )
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostFeed