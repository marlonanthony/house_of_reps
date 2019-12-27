import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getPosts,
  getMorePosts,
  getMatchingPosts,
  getLikedPosts,
  getMoreLikedPosts,
  getPostsByHashtag,
  getMorePostsByHashtag
} from '../../actions/postActions'
import { getCurrentProfile, getProfiles } from '../../actions/profileActions'
import PostForm from '../../components/posts/post_form/PostForm'
import PoolsContainer from '../../components/posts/post-assets/promos/djpools/PoolsContainer'
import StoresContainer from '../../components/posts/post-assets/promos/stores/StoresContainer'
import PerksContainer from '../../components/posts/post-assets/promos/perks/PerksContainer'
import SearchBar from '../../components/posts/post-assets/searchbar/SearchBar'
import PostFeedProfileContent from '../../components/posts/post-assets/postfeed_profile_content/PostFeedProfileContent'
import SearchPost from '../../components/posts/post-assets/searchbar/SearchPost'
import Buttons from '../../components/posts/post-assets/buttons/Buttons'
import BrandContainer from '../../components/posts/post-assets/promos/brands/BrandContainer'
import PostsContainer from '../../components/posts/posts_container/PostsContainer'
import HighlightsContainer from '../../components/posts/post-assets/highlights/HighlightsContainer'
import Footer from '../../components/posts/post-assets/footer/Footer'
import Speakeasy from '../../components/chatrooms/speakEasy/Speakeasy'
import './Posts.css'

class Posts extends Component {
  state = {
    showPreview: false,
    showLikes: false,
    showHashtags: false,
    hashtag: '',
    count: 10,
    start: 0,
    onlineCount: 0
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.getPosts(this.state.count, this.state.start)
    this.props.getCurrentProfile()
    this.props.getProfiles()
    this.setState(prevState => ({ start: prevState.start + 1 }))
    this.setState({ onlineCount: JSON.parse(localStorage.getItem('count')) })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.onlineCount !== this.props.onlineCount) {
      this.setState({ onlineCount: prevProps.onlineCount })
    }
  }

  fetchMore = () => {
    const { count, start, hashtag } = this.state
    if (this.state.showLikes) {
      this.props.getMoreLikedPosts(count, start)
      this.setState(prevState => ({ start: prevState.start + 1 }))
    } else if (this.state.showHashtags) {
      this.props.getMorePostsByHashtag(hashtag, count, start)
      this.setState(prevState => ({ start: prevState.start + 1 }))
    } else {
      this.props.getMorePosts(count, start)
      this.setState(prevState => ({ start: prevState.start + 1 }))
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  showLikesHandler = () => {
    this.setState(
      prevState => ({
        showLikes: !prevState.showLikes,
        start: 1
      }),
      () => {
        if (this.state.showLikes) {
          this.props.getLikedPosts()
        } else {
          this.props.getPosts()
        }
      }
    )
  }

  showPostByHashtag = tag => {
    // set hashtag to tag if tag exist lest hashtag will be empty when not using buttons
    if (tag.length) this.setState({ hashtag: tag })
    this.setState(
      prevState => ({
        showHashtags: !prevState.showHashtags,
        start: 1
      }),
      () => {
        if (this.state.showHashtags) {
          this.props.getPostsByHashtag(
            tag.length ? tag : this.state.hashtag.toLowerCase()
          )
        } else {
          this.props.getPosts()
        }
      }
    )
  }

  render() {
    const { posts, loading } = this.props.post,
      { profile, profiles } = this.props.profile,
      {
        showPreview,
        showHashtags,
        hashtag,
        showLikes,
        onlineCount
      } = this.state,
      { user } = this.props.auth
    return (
      <div className="feed">
        <SearchPost
          showPostByHashtag={this.showPostByHashtag}
          onChange={this.onChange}
          hashtag={hashtag}
          showHashtags={showHashtags}
        />
        <PostForm showPreview={showPreview} />
        <SearchBar profiles={profiles} />
        <Buttons showPostByHashtag={this.showPostByHashtag} />
        <PostFeedProfileContent
          profile={profile}
          user={user}
          showLikesHandler={this.showLikesHandler}
          showLikes={showLikes}
          showHighlight={this.props.showHighlight}
          toggleShowHighlight={this.props.toggleShowHighlight}
        />
        <PoolsContainer profiles={profiles} loading={loading} />
        <PerksContainer profiles={profiles} loading={loading} />
        <PostsContainer
          posts={posts}
          profiles={profiles}
          loading={loading}
          fetchMore={this.fetchMore}
          showsPreview={showPreview}
        />
        <HighlightsContainer
          profiles={profiles}
          loading={loading}
          toggleShowHighlight={this.props.toggleShowHighlight}
        />
        <StoresContainer profiles={profiles} loading={loading} />
        <BrandContainer profiles={profiles} loading={loading} />
        <Speakeasy
          onlineCount={onlineCount}
          handle={profile && profile.handle}
        />
        <Footer />
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getMorePosts: PropTypes.func.isRequired,
  getMatchingPosts: PropTypes.func.isRequired,
  getLikedPosts: PropTypes.func.isRequired,
  getMoreLikedPosts: PropTypes.func.isRequired,
  toggleShowHighlight: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    getPosts,
    getCurrentProfile,
    getProfiles,
    getMorePosts,
    getLikedPosts,
    getMoreLikedPosts,
    getMatchingPosts,
    getPostsByHashtag,
    getMorePostsByHashtag
  }
)(Posts)
