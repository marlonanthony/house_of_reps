import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import Moment from 'react-moment' 
import { deleteComment, getPosts } from '../../actions/postActions' 

import './CommentItem.css'

class CommentItem extends Component {

  state = {
    comment: this.props.comment
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.comment !== prevState.comment) {
      this.setState({ comment: this.props.comment })
    }
  }

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
    this.setState({ comment: false })
  }

  render() {
    const { postId, auth, profile } = this.props 
    const { comment } = this.state

    if(!this.state.comment) return <div />

    return (
      <div id='comment-feed-container'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex'}}>
            <Link to={`/profile/${profile.handle}`}>
              <img id='comment-feed-avatar' src={comment.avatar} alt={comment.avatar} />
            </Link>
            <p id='comment-feed-date'><Moment format='MM/DD/YYYY'>{comment.date}</Moment></p>
          </div>
          <div style={{ display: 'flex' }}>
            { comment.user === auth.user.id ? (
            <button 
              onDoubleClick={this.onDeleteClick.bind(this, postId, comment._id)} 
              type="button" 
              title='Delete comment'
              id='commment-feed-delete-button'>
              <i className="fas fa-times comment-feed-delete-icon" />
            </button> ) : null }
          </div>
        </div>
        <div className="">
          { !comment.description && !comment.image && !comment.title && !comment.url && !comment.media
            ? <p id='comment-feed-text'>{comment.text}</p>
            : comment.media
            ? ( <div>
                  <p className='post_content'>{comment.text}</p>
                  <img src={comment.media} alt="uploaded" style={{ width: '100%', height: '100%' }} />
                </div>
              )
            : ( 
                <div className='comment-wrapper'>
                  <p id='comment-feed-text'>{comment.text}</p>
                  <div id='wrap-comment-link'>
                    <a href={comment.url} target='_blank' id='comment-anchor-container'>
                      <div id='comment-link-container'>
                        <img src={comment.image} alt='thumbnail' id='comment-link-img' />
                        <div id='comments-grandson'>
                          <p id='comments-title'>{comment.title}</p>
                          <p id='comments-description'>{comment.description}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { deleteComment, getPosts })(CommentItem)
