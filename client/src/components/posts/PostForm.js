import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import TextAreaFieldGroup from '../common/TextAreaFieldGroup' 
import { addPost } from '../../actions/postActions' 
import axios from 'axios'
import LinkPreview from './LinkPreview'
import Dropzone from 'react-dropzone' 
import request from 'superagent' 
// import Embed from '../slate/embed/Embed'
// import classnames from 'classnames'
import './PostForm.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class PostForm extends Component {
  state = {
    text: '',
    errors: {},
    rows: 2,
    minRows: 2,
    maxRows: 10,
    show: false,
    data: {},
    showPreview: false,
    uploadedFileCloudinaryUrl: '',
    uploadedFile: '',
    media: ''
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.data !== this.state.data) {
      this.setState({ data: this.state.data })
    }
    // if(prevProps.errors !== this.props.errors) {
    //   this.setState({ errors: prevProps.errors })
    // }
  }

  onChange = e => {
    const textareaLineHeight = 24
    const { minRows, maxRows } = this.state 

    const previousRows = e.target.rows 
    e.target.rows = minRows // reset number of rows in textarea

    const currentRows = e.target.scrollHeight / textareaLineHeight 

    if(currentRows === previousRows) {
      e.target.rows = currentRows
    }

    if(currentRows >= maxRows) {
      e.target.rows = maxRows
      e.target.scrollTop = e.target.scrollHeight
    }

    this.setState({ 
      [e.target.name]: e.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    })
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
    this.setState({ showPreview: false })

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      image: this.state.data.image,
      title: this.state.data.title,
      description: this.state.data.description,
      url: this.state.data.url,
      media: this.state.media 
    }

    this.props.addPost(newPost) 
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
    const { errors, data, text, showPreview, media, rows, show } = this.state 
    return (
      <div className='post_form'>
        {/* <Embed /> */}
        <div id='post-form-textareafieldgroup'>
          <form onSubmit={this.onSubmit} onClick={this.showButtonsHandler} >
            <TextAreaFieldGroup
              className='text-area'
              placeholder="What's the discussion?"
              name='text'
              value={text} 
              onChange={this.onChange} 
              onPaste={this.onPaste}
              error={errors.text} 
              rows={rows}
            />
            <div className={ show ? 'otherstuff' : 'disp'}>
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
              <button className='post_submit_button' title='Submit'>
                <i id='post-submit-icon' className="far fa-paper-plane " />
              </button>
            </div>
            { showPreview ? <LinkPreview post={data} media={media} /> : null }
          </form>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors, 
  auth: state.auth 
})

export default connect(mapStateToProps, { addPost })(PostForm)
