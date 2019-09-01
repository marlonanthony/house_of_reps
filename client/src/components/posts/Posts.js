import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import InfinteScroll from 'react-infinite-scroll-component'
import { 
  getPosts, 
  getMorePosts, 
  getMatchingPosts, 
  getLikedPosts, 
  getMoreLikedPosts, 
  getPostsByHashtag 
} from '../../actions/postActions'
import { getCurrentProfile, getProfiles } from '../../actions/profileActions'
import PostForm from './PostForm' 
import Spinner from '../common/Spinner' 
import PostFeed from './PostFeed'
import DjPools from './post-assets/promos/djpools/DjPools'
import CertifiedStores from './post-assets/promos/stores/CertifiedStores'
import Perks from './post-assets/promos/perks/Perks'
import Brands from './post-assets/promos/brands/Brands'
import Highlights from './post-assets/highlights/Highlights'
import SearchBar from './post-assets/searchbar/SearchBar'
import PostFeedProfileContent from './post-assets/postfeed_profile_content/PostFeedProfileContent'
import SearchPost from './post-assets/searchbar/SearchPost'
import Buttons from './post-assets/buttons/Buttons'

import './Posts.css'

class Posts extends Component {

  state = { 
    showsPreview: false,
    showLikes: false,
    showHashtags: false,
    hashtag: '',
    count: 10, 
    start: 0,
    showPopup: false,
  }

  componentDidMount() {
    window.scrollTo(0, 0) 
    this.props.getPosts(this.state.count, this.state.start) 
    this.props.getCurrentProfile()
    this.props.getProfiles()
    this.setState( prevState => ({ start: prevState.start + 1 }))
  }

  fetchMore = () => {
    const { count, start } = this.state 
    if(this.state.showLikes) {
      this.props.getMoreLikedPosts(count, start) 
      this.setState( prevState => ({ start: prevState.start + 1 }))
    } else if(this.state.showHashtags) {
      return                      ////             finish this      //////////////////////
    } else {
      this.props.getMorePosts(count, start)
      this.setState( prevState => ({ start: prevState.start + 1 }))
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  showLikesHandler = () => {
    this.setState( prevState => ({ 
      showLikes: !prevState.showLikes,
      start: 1
    }), () => {
      if(this.state.showLikes) {
        this.props.getLikedPosts()
      } else {
        this.props.getPosts() 
      }
    })
  }

  showPostByHashtag = () => {
    this.setState(prevState => ({
      showHashtags: !prevState.showHashtags,
      start: 1
    }), () => {
      if(this.state.showHashtags) {
        this.props.getPostsByHashtag(this.state.hashtag)
      } else {
        this.props.getPosts()
      }
    })
  }

  showNotificationsHandler = () => {
    this.props.history.push('/notifications')
  }

  popupHandler = () => {
    this.setState(prevState => ({ showPopup: !prevState.showPopup }))
  }

  render() {
    const { posts, loading } = this.props.post 
    const { profile, profiles } = this.props.profile 
    const { showsPreview } = this.state
    const { user } = this.props.auth
    let postContent, 
        profileContent,
        djpools,
        stores,
        perks, 
        brands, 
        highlights,
        orderedHighlights

    if(profiles === null || loading) highlights = null
    else {
      let hls = profiles.map(profile => profile.venues).map(val => val.length > 0 ? val[0] : null).filter(val => val !== null)
      highlights = [].concat.apply([], hls)
      orderedHighlights = highlights && highlights.sort((a,b) => new Date(b.dateCreated) - new Date(a.dateCreated))
    }
    

    if(profiles === null || loading) {
      brands = null
    } else {
      brands = profiles.map(val => (
        val.brands.length > 0 && val.brands !== null 
        ? val.brands.map(brand => ( <Brands key={brand._id} brands={val.brands} brand={brand} />))
        : null 
      ))
    }

    if(profiles === null || loading) {
      perks = null
    } else {
      perks = profiles.map(val => (
        val.perks.length > 0 && val.perks !== null 
        ? val.perks.map(perk => ( <Perks key={perk._id} perks={val.perks} perk={perk} />))
        : null 
      ))
    }

    if(profiles === null || loading) {
      stores = null
    } else {
      stores = profiles.map(val => (
        val.stores.length > 0 && val.stores !== null 
        ? val.stores.map(store => ( <CertifiedStores key={store._id} stores={val.stores} store={store} />))
        : null 
      ))
    }

    if(profiles === null || loading) {
      djpools = null
    } else {
      djpools  = profiles.map(val => (
        val.djpools.length > 0 && val.djpools !== null 
        ? val.djpools.map(djpool => ( <DjPools key={djpool._id} djpools={val.djpools} djpool={djpool} /> ))
        : null 
      ))
    }

    if(!profile) {
      profileContent = null
    } else {
      profileContent = (
        <PostFeedProfileContent
          profile={profile}
          user={user} 
          popupHandler={this.popupHandler}
          showPopup={this.state.showPopup}
          showLikesHandler={this.showLikesHandler}
          showLikes={this.state.showLikes}
          showNotificationsHandler={this.showNotificationsHandler}
        />
      )
    }

    if(!posts || !profiles || loading) {
      postContent = <Spinner />
    }

    postContent = (
      <InfinteScroll
        dataLength={ posts.length}
        next={this.fetchMore}
        hasMore={true}
        loader={null}>
        <PostFeed 
          showPreview={ showsPreview } 
          posts={ posts } 
          profiles={ profiles } 
        />
        </InfinteScroll>
    )

    return (
      <div className='feed'>
        <SearchPost
          showPostByHashtag={this.showPostByHashtag}
          onChange={this.onChange}
          hashtag={this.state.hashtag.toLowerCase()}
          showHashtags={this.state.showHashtags}
        />
        <div className='post-feed-form'>
          <PostForm  showPreview={ showsPreview }/>
        </div>
        <SearchBar profiles={ profiles } />
        <Buttons />
        <div className='post-feed-profile'>{ profileContent }</div>
        <div className='djpools'>{ djpools }</div>
        <div className='perks_and_hookups'>{ perks }</div>
        <div className='post-feed-post-content'>
          { postContent }
        </div>
        { highlights && 
          <div className='post-feed-highlights'>
            <Highlights recentHighlights={ orderedHighlights } />
          </div>
        }
        <div className='stores_container'>{ stores }</div>
        <div className='certified_brands'>{ brands }</div>
        <div className='post-feed-footer'><footer>Copyright &copy; 2018 House of Reps</footer></div>
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
  getMoreLikedPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth 
})

export default connect(mapStateToProps, { 
  getPosts, 
  getCurrentProfile, 
  getProfiles, 
  getMorePosts, 
  getLikedPosts, 
  getMoreLikedPosts, 
  getMatchingPosts,
  getPostsByHashtag
})(withRouter(Posts)) 