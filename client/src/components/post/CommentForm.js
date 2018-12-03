import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import TextAreaFieldGroup from '../common/TextAreaFieldGroup' 
import { addComment, getPosts } from '../../actions/postActions'
import axios from 'axios'
import LinkPreview from '../posts/LinkPreview'
import Dropzone from 'react-dropzone' 
import request from 'superagent' 

import './CommentForm.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class CommentForm extends Component {
  state = {
    text: '',
    errors: {},
    show: false,
    data: {},
    showPreview: false,
    uploadedFileCloudinaryUrl: '',
    uploadedFile: '',
    media: ''
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
      url: this.state.data.url,
      media: this.state.media
    }

    this.props.addComment(postId, newComment) 
    this.setState({ text: '', data: {}, media: '' })
    e.target.reset() 
  }

  showButtonsHandler = () => {
    this.setState(prevState => ({ show: !prevState.show }))
  }

  onImageDrop = files => {
    this.setState({ uploadedFile: files[0]})
    this.handleImageUpload(files[0])
  }

  handleImageUpload = (file) => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file) 
    
    upload.end((err, response) => {
      if(err) console.log(err) 
      if(response.body.secure_url !== '') {
        this.setState({ uploadedFileCloudinaryUrl: response.body.secure_url})
        this.setState({ media: response.body.secure_url })
        this.setState({ showPreview: true })
      }
    })
  }

  render() {
    const { errors, data, media, show, showPreview, text } = this.state 
    return (
      <div className="post-form ">
        <div onClick={this.showButtonsHandler}>
          <form onSubmit={this.onSubmit}>
            <TextAreaFieldGroup 
              className="" 
              placeholder="Reply to post" 
              name='text'
              value={text} 
              onChange={this.onChange} 
              onPaste={this.onPaste}
              error={errors.text} 
            />
            <div className={ show ? 'otherstuff' : 'display-none' }>
              <Dropzone 
                style={{ 
                  border: 'none'
                }}
                multiple={false}
                accept='image/*, video/*'
                onDrop={this.onImageDrop}>
                <button style={{ background: 'none', border: 'none', outline: 'none' }} onClick={this.addPhoto}>
                  <i className="fas fa-image" id='add-photo' title='Upload Photo' />
                </button>
              </Dropzone>
              <button type='submit' style={{ background: 'none', border: 'none', outline: 'none' }}>
                <i className='far fa-paper-plane' id='comment-form-submit-btn' />
              </button>
            </div>
            { showPreview ? <LinkPreview post={data} media={media} /> : null }
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
