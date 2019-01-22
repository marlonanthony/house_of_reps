import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types' 
import Moment from 'react-moment' 
import { deleteComment, getPosts } from '../../actions/postActions' 
import { getProfiles } from '../../actions/profileActions'
import CommentsModal from '../UI/modal/CommentsModal'
import Backdrop from '../UI/backdrop/Backdrop'
import CommentText from '../posts/post-assets/post_comment_text/CommentText'
import PostModalText from '../posts/post-assets/post_comment_text/PostModalText'
import './CommentItem.css'

class CommentItem extends Component {

  state = {
    comment: this.props.comment,
    showModal: false 
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.comment !== prevState.comment) {
      this.setState({ comment: this.props.comment })
    }
    if(this.props.profiles !== prevProps.profiles){
      this.props.getProfiles() 
    }
  }

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
    this.setState({ comment: false })
  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  modalShow = () => {
    this.setState({ showModal: true })
  }

  userNameOrAvatarClicked = commentId => {
    this.props.profiles.map(profile =>  {
      if(profile.user._id === commentId) {
        this.props.history.push(`/profile/${profile.handle}`)
      }
    })
  }

  render() {
    const { postId, auth } = this.props 
    const { comment } = this.state
    // let userHandle

    // if(!this.props.profiles){
    //   userHandle = null 
    // } else {
    //   this.props.profiles.map(profile => {
    //     // if(profile.user._id === comment.user) {
    //       userHandle = <p className='comment-feed-name'>{comment.name}</p>
    //       // userHandle = <p className='comment-feed-name'>{profile.user.name}</p>
    //     // }
    //   })
    // }

    let youtubeUrl = comment.url
    
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = comment.url.replace(/youtu\.be/gi, 'www.youtube.com')
                             .replace(/watch\?v\=/gi, 'embed/')
                             .replace(/\&feature\=www\.youtube\.com/gi, '')
      : youtubeUrl = null 

    const commentsModal = this.state.showModal ? (
      <Fragment> 
        <CommentsModal>
          <PostModalText postText={comment.text} />
          <img src={comment.media} alt="uploaded" style={{maxWidth: '100%', maxHeight: '600px'}} />
        </CommentsModal>
      </Fragment>
    ) : null 

    if(!this.state.comment) return <div />

    return (
      <Fragment>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        {commentsModal}
        <div id='comment-feed-container'>
          <img id='comment-feed-avatar' onClick={()=> this.userNameOrAvatarClicked(comment.user)} src={comment.avatar} alt={comment.avatar} />
          <div id='comment_name_and_date_container' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '7px' }}>
            <p className='comment-feed-name'>{comment.name}</p>
            <p id='comment-feed-date'><Moment format='MM/DD/YYYY'>{comment.date}</Moment></p>
          </div>
          { comment.user === auth.user.id ? (
          <button 
            onDoubleClick={this.onDeleteClick.bind(this, postId, comment._id)} 
            type="button" 
            title='Double click to delete comment'
            id='commment-feed-delete-button'>
            <i className="fas fa-times comment-feed-delete-icon" />
          </button> ) : null }
          <div id='comment_content_container'>
            { !comment.description && !comment.image && !comment.title && !comment.url && !comment.media
              ? <CommentText commentText={comment.text} />
              : comment.media
              ? ( <div onClick={this.modalShow}>
                    <CommentText commentText={comment.text} />
                    <img src={comment.media} alt="uploaded" className='comments_image' />
                  </div>
                )
              : ( 
                  <div className='comment-wrapper'>
                    <CommentText commentText={comment.text} />
                    <div style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
                      { youtubeUrl 
                      ? 
                        // <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                          <iframe width="100%" height="300" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> 
                        // </div>
                      : <a href={comment.url} target='_blank' rel='noopener noreferrer' id='comment-anchor-container'>
                          <div id='comment-link-container'>
                            <img src={comment.image} alt='thumbnail' id='comment-link-img' />
                            <div id='comments-grandson'>
                              <p id='comments-title'>{comment.title}</p>
                              <p id='comments-description'>{comment.description}</p>
                            </div>
                          </div>
                        </a>
                      }
                    </div>
                    {/* <div id='wrap-comment-link'>
                      <a href={comment.url} target='_blank' id='comment-anchor-container'>
                        <div id='comment-link-container'>
                          <img src={comment.image} alt='thumbnail' id='comment-link-img' />
                          <div id='comments-grandson'>
                            <p id='comments-title'>{comment.title}</p>
                            <p id='comments-description'>{comment.description}</p>
                          </div>
                        </div>
                      </a>
                    </div> */}
                  </div>
                )
            }
          </div>
        </div>
      </Fragment>
      // <Fragment>
      //   <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
      //   {commentsModal}
      //   <div id='comment-feed-container'>
      //     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      //       <div style={{ display: 'flex', alignItems: 'center' }}>
      //         <img id='comment-feed-avatar' onClick={()=> this.userNameOrAvatarClicked(comment.user)} src={comment.avatar} alt={comment.avatar} />
      //         <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '7px' }}>
      //           { userHandle }
      //           <p id='comment-feed-date'><Moment format='MM/DD/YYYY'>{comment.date}</Moment></p>
      //         </div>
      //       </div>
      //       <div style={{ display: 'flex' }}>
      //         { comment.user === auth.user.id ? (
      //         <button 
      //           onDoubleClick={this.onDeleteClick.bind(this, postId, comment._id)} 
      //           type="button" 
      //           title='Double click to delete comment'
      //           id='commment-feed-delete-button'>
      //           <i className="fas fa-times comment-feed-delete-icon" />
      //         </button> ) : null }
      //       </div>
      //     </div>
      //     <div>
      //       { !comment.description && !comment.image && !comment.title && !comment.url && !comment.media
      //         ? <p id='comment-feed-text'>{comment.text}</p>
      //         : comment.media
      //         ? ( <div id='post_image_and_text_container' onClick={this.modalShow}>
      //               <p className='comment-feed-text'>{comment.text}</p>
      //               <img src={comment.media} alt="uploaded" className='comments_image' />
      //             </div>
      //           )
      //         : ( 
      //             <div className='comment-wrapper'>
      //               <p id='comment-feed-text'>{comment.text}</p>
      //               <div id='wrap-comment-link'>
      //                 <a href={comment.url} target='_blank' id='comment-anchor-container'>
      //                   <div id='comment-link-container'>
      //                     <img src={comment.image} alt='thumbnail' id='comment-link-img' />
      //                     <div id='comments-grandson'>
      //                       <p id='comments-title'>{comment.title}</p>
      //                       <p id='comments-description'>{comment.description}</p>
      //                     </div>
      //                   </div>
      //                 </a>
      //               </div>
      //             </div>
      //           )
      //       }
      //     </div>
      //   </div>
      // </Fragment>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment, getPosts, getProfiles })(withRouter(CommentItem))
