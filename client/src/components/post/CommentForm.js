import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import TextAreaFieldGroup from '../common/TextAreaFieldGroup' 
import { addComment, getPosts } from '../../actions/postActions' 

import './CommentForm.css'

class CommentForm extends Component {
  state = {
    text: '',
    errors: {}
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps, this.state.text)
  // }

  // componentWillReceiveProps(newProps) {
  //   if(newProps.errors) {
  //     this.setState({ errors: newProps.errors })
  //   }
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    
    const { user } = this.props.auth 
    const { postId } = this.props 

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar 
    }

    this.props.addComment(postId, newComment) 
    this.setState({ text: '' })
  }
  

  render() {
    const { errors } = this.state 
    return (
      <div className="post-form ">
        <div className="">
          <form onSubmit={this.onSubmit}>
            <div className="">
              <TextAreaFieldGroup 
                className="" 
                placeholder="Reply to post" 
                name='text'
                value={this.state.text} 
                onChange={this.onChange} 
                error={errors.text} 
              />
            </div>
            <button type='submit' style={{ background: 'none', border: 'none', outline: 'none' }}>
              <i className='far fa-paper-plane' id='comment-form-submit-btn' />
            </button>
            {/* <button type="submit" id='comment-form-submit-btn'>Submit</button> */}
          </form>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors, 
  auth: state.auth 
})

export default connect(mapStateToProps, { addComment, getPosts })(CommentForm)
