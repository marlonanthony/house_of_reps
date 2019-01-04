import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { getPosts } from '../../actions/postActions'
import { getCurrentProfile, getProfiles } from '../../actions/profileActions'
import PostForm from './PostForm' 
import Spinner from '../common/Spinner' 
import PostFeed from './PostFeed'
import DjPools from './post-assets/DjPools'
import CertifiedStores from './post-assets/CertifiedStores'
import Perks from './post-assets/Perks'
import Brands from './post-assets/Brands'
// import DjPoolsSmall from './post-assets/DjPoolsSmall'
import './Posts.css'

class Posts extends Component {

  state ={
    showsPreview: false 
  }

  componentDidMount() {
    this.props.getPosts() 
    this.props.getCurrentProfile()
    this.props.getProfiles()
  }
  
  render() {
    const { posts, loading } = this.props.post 
    const { profile, profiles } = this.props.profile 
    const { showsPreview } = this.state
    const { user } = this.props.auth
    let postContent 
    let profileContent
    let djpools
    let stores
    let perks 
    let brands 
    let highlights
    // let djpoolssmall

    if(profiles === null || loading) highlights = null
    else highlights = profiles.map(profile => profile.venues)
    let firstHighlight = highlights && highlights.map(val => val.length > 0 ? val[0] : null).filter(val => val !== null)
    let first = [].concat.apply([], firstHighlight)
    

    if(profiles === null || loading) {
      brands = <Spinner />
    } else {
      brands = profiles.map(val => (
        val.brands.length > 0 && val.brands !== null 
        ? val.brands.map(brand => ( <Brands key={brand._id} brands={val.brands} brand={brand} />))
        : null 
      ))
    }

    if(profiles === null || loading) {
      perks = <Spinner />
    } else {
      perks = profiles.map(val => (
        val.perks.length > 0 && val.perks !== null 
        ? val.perks.map(perk => ( <Perks key={perk._id} perks={val.perks} perk={perk} />))
        : null 
      ))
    }

    if(profiles === null || loading) {
      stores = <Spinner />
    } else {
      stores = profiles.map(val => (
        val.stores.length > 0 && val.stores !== null 
        ? val.stores.map(store => ( <CertifiedStores key={store._id} stores={val.stores} store={store} />))
        : null 
      ))
    }

    if(profiles === null || loading) {
      djpools = <Spinner />
    } else {
      djpools  = profiles.map(val => (
        val.djpools.length > 0 && val.djpools !== null 
        ? val.djpools.map(djpool => ( <DjPools key={djpool._id} djpools={val.djpools} djpool={djpool} /> ))
        : null 
      ))
    }

    // if(profiles === null || loading) {
    //   djpoolssmall = <Spinner />
    // } else {
    //   djpoolssmall  = profiles.map(val => (
    //     val.djpools.length > 0 && val.djpools !== null 
    //     ? val.djpools.map(djpool => ( <DjPoolsSmall key={djpool._id} djpools={val.djpools} djpool={djpool} /> ))
    //     : null 
    //   ))
    // }

    if(profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <img id='posts-profile-img' src={user.avatar} alt={user.name} />
            <p style={{ color: 'rgb(29, 138, 228)', fontSize: '13px' }}>@{profile.handle}</p>
          </div>
      
      )
    }

    if(posts === null || profiles === undefined || loading) {
      postContent = <Spinner />
    } else {
      postContent = <PostFeed showPreview={showsPreview} posts={posts} profiles={profiles} />
    }

    return (
      <div className='feed'>
        <div className='post-feed-profile'>{ profileContent }</div>
        <div className='post-feed-social'>Social</div>
        <div className='djpools'>{ djpools }</div>
        <div className='perks_and_hookups'>{ perks }</div>
        {/* <div className='djpoolsscroll'>{djpoolssmall}</div> */}
        <div className='post-feed-form'>
          <PostForm showPreview={showsPreview}/>
        </div>
        <div className='post-feed-post-content'>{postContent}</div>
        { first[1] ? 
          <div className='post-feed-highlights'>
            {/* <p style={{fontSize: '12px'}}>{first[2].title}</p> */}
            <iframe 
              title={first[1].video} 
              style={{width: '100%', height: '100%'}} 
              src={first[1].video} 
              frameBorder={0}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen={true}>
            </iframe>
          </div>
          : null
        }
        <div className='stores_container'>{ stores }</div>
        <div className='certified_brands'>{ brands }</div>
        <div className='post-feed-footer'>
          <footer>Copyright &copy; 2018 House of Reps</footer>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth 
})

export default connect(mapStateToProps, { getPosts, getCurrentProfile, getProfiles })(Posts) 