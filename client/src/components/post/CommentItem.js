import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import Moment from 'react-moment' 
import { deleteComment, getPosts } from '../../actions/postActions' 

import './CommentItem.css'

class CommentItem extends Component {

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
  }

  render() {
    
    const { comment, postId, auth, profile } = this.props 

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
              onClick={this.onDeleteClick.bind(this, postId, comment._id)} 
              type="button" 
              title='Delete comment'
              id='commment-feed-delete-button'>
              <i className="fas fa-times comment-feed-delete-icon" />
            </button> ) : null }
          </div>
        </div>
        <div className="">
          <p id='comment-feed-text'>{comment.text}</p>
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
