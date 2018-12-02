import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import TextAreaFieldGroup from '../common/TextAreaFieldGroup' 
import { addComment, getPosts } from '../../actions/postActions'
import axios from 'axios'
import LinkPreview from '../posts/LinkPreview'

import './CommentForm.css'

class CommentForm extends Component {
  state = {
    text: '',
    errors: {},
    show: false,
    data: {},
    showPreview: false 
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.data !== this.state.data) {
      this.setState({ data: this.state.data })
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onPaste = e => {
    e.stopPropagation() 
    let clipboardData = e.clipboardData || window.clipboardData
    let pastedData = clipboardData.getData('Text') 

    // Check for URL 
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    if(!regex.test(pastedData)) {
      this.setState({ text: pastedData })
    } else {
      axios
      .get(`https://api.linkpreview.net/?key=5beb6c4718c9c4851e9a2a49e54a3adc2dcbacd64fffc&q=${pastedData}`)
      .then(res => this.setState({ data: res.data }))
      .then(this.setState((prevState) => ({ showPreview: !prevState.showPreview })))
      .catch(err => console.log(err)) 
    }
  }

  onSubmit = e => {
    e.preventDefault()
    
    const { user } = this.props.auth 
    const { postId } = this.props 
    this.setState({ showPreview: false })

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      image: this.state.data.image,
      title: this.state.data.title,
      description: this.state.data.description,
      url: this.state.data.url 
    }

    this.props.addComment(postId, newComment) 
    this.setState({ text: '', data: {} })
    e.target.reset() 
  }
  

  render() {
    const { errors, data } = this.state 
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
                onPaste={this.onPaste}
                error={errors.text} 
              />
            </div>
            <button type='submit' style={{ background: 'none', border: 'none', outline: 'none' }}>
              <i className='far fa-paper-plane' id='comment-form-submit-btn' />
            </button>
            { this.state.showPreview ? <LinkPreview post={data} /> : null }
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
