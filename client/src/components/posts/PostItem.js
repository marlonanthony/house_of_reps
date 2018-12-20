import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
import classnames from 'classnames' 
import Moment from 'react-moment' 
import { deletePost, addLike, removeLike } from '../../actions/postActions'
import CommentsModal from '../UI/modal/CommentsModal'
import Backdrop from '../UI/backdrop/Backdrop'

// For comments 
import CommentFeed from '../post/CommentFeed'
import CommentForm from '../post/CommentForm'

import './PostItem.css'
 
class PostItem extends Component {

  // For comments 
  state = { 
    showComments: false, 
    text: '',
    postComments: [],
    likes: this.props.post.likes,
    liked: false,
    showModal: false 
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.post.comments !== prevState.postComments) {
      this.setState({ postComments: this.props.post.comments })
    }
  }

  onDeleteClick = id => {
    this.props.deletePost(id) 
  }

  onLikeClick = id => {
    this.props.addLike(id)
    
    const { auth } = this.props 
    if(this.state.likes.map(like => like.user === auth.user.id).length <= 0){
      this.setState(prevState => ({ likes: this.state.likes.concat(id) }))
      this.setState(prevState => ({ liked: true }))
    }
  }

  onUnlikeClick = id => {
    this.props.removeLike(id)

    const { auth } = this.props 
    if(this.state.likes.map(like => like.user === auth.user.id).length > 0) {
      this.setState({ likes: this.state.likes.filter((like, i, arr) => like.user === auth.user.id) })
      this.setState(prevState => ({ liked: false }))
    }
    // this.setState({ likes: this.state.likes.filter(like => like.user === auth.user.id) })
    // this.setState({ liked: false })
  }

  findUserLike = likes => {
    const { auth } = this.props 
  
    return likes.filter(like => like.user === auth.user.id).length > 0
  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  modalShow = () => {
    this.setState({ showModal: true })
  }

  userNameOrAvatarClicked = postId => {
    this.props.profiles.map(profile =>  {
      if(profile.user._id === postId) {
        this.props.history.push(`/profile/${profile.handle}`)
      }
    })
  }

  render() {
    const { post, auth, showActions } = this.props 
    const { showComments, text, postComments, likes } = this.state 

    let youtubeUrl = post.url
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = post.url.replace(/youtu\.be/gi, 'www.youtube.com')
                             .replace(/watch\?v\=/gi, 'embed/')
                             .replace(/\&feature\=www\.youtube\.com/gi, '')
      : youtubeUrl = null 

    const postModal = this.state.showModal ? (
      <Fragment> 
        <CommentsModal>
          <div>
            <p id='comment-modal-text'>{post.text}</p>
            <img src={post.media} alt="uploaded" style={{maxWidth: '100%', maxHeight: '600px'}} />
          </div>
        </CommentsModal>
      </Fragment>
    ) : null 

    return (
     <Fragment>
     <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
     {postModal}
     <div className='posts_container'>
      <div className='post_avatar_and_name'>
        <img className='post_avatar_img' onClick={()=> this.userNameOrAvatarClicked(post.user)} src={post.avatar} alt={post.name} />
        <div style={{ display: 'flex', flexDirection: 'column'  }}>
          <p className='post_name' onClick={() => this.userNameOrAvatarClicked(post.user)}>{post.name}</p>
          <p className='post_feed_date'><Moment format='MM/DD/YYYY'>{post.date}</Moment></p>
        </div>
      </div>

      <div>
        { !post.description && !post.image && !post.title && !post.url && !post.media
          ? <p className='post_content'>{post.text}</p>
          : post.media 
          ? ( <div>
                <p className='post_content'>{post.text}</p>
                <img className='postfeed-media-pic' onClick={this.modalShow} src={post.media} alt="uploaded" />
              </div>
            )
          : ( <div className='post_content'>
                <p>{post.text}</p>
                <div style={{ background: 'rgba(0, 0, 0, .5)', borderRadius: '5px' }}>
                  { youtubeUrl 
                  ? <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                      <iframe width="100%" height="300" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> 
                    </div>
                  : <a href={post.url} target='_blank'>
                      <img src={post.image} alt='thumbnail' style={{ width: '100%' }} id='post-link-img' />
                    </a> 
                  }
                  <p style={{textAlign: 'center', fontSize: '12px'}}>{post.title}</p>
                  <p style={{textAlign: 'center', fontSize: '12px', padding: '0 5px 20px 5px'}}>{post.description}</p>
                </div>
              </div>
            )
        }
        { showActions ? (<span>
          <button 
            title='like'
            className={this.state.liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
              'liked' : this.findUserLike(post.likes) 
            })}
            onClick={this.onLikeClick.bind(this, post._id)}>
            <i className='fas fa-thumbs-up icons like'></i>
            <span>{likes.length}</span>
          </button>
          <button 
            title='unlike'
            className='postfeed_buttons'
            onClick={this.onUnlikeClick.bind(this, post._id)}>
            <i className="fas fa-thumbs-down icons" id='unlike'></i>
          </button>
          <button 
            title='comment'
            onClick={() => this.setState((prevState, props) => ({ 
              text: props.post._id, 
              postComments: props.post.comments, 
              showComments: !prevState.showComments }))} 
            className='postfeed_buttons'>  
            <i className='fas fa-comment icons' id='comment'/>
          </button>
          { post.user === auth.user.id ? (
            <button 
              title='double click to delete'
              className='postfeed_buttons delete'
              onDoubleClick={this.onDeleteClick.bind(this, post._id)}>
              <i className="fas fa-times icons" />
            </button> 
            ) : null }
        </span>) : null 
        }
        { showComments ? (
          <div>
            <CommentForm postId={text} /> 
            <CommentFeed postId={text} comments={postComments} profiles={this.props.profiles}/>
          </div> 
          ) : null 
        }
      </div>
     </div>
     </Fragment>
    )
  }
}

PostItem.defaultProps = {
  showActions: true 
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(withRouter(PostItem))