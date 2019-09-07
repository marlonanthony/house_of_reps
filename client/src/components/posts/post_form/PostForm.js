import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react' 
import JSEMOJI from 'emoji-js'
import Dropzone from 'react-dropzone' 
import request from 'superagent' 

import TextAreaForm from '../../common/textarea/TextAreaForm' 
import { addPost } from '../../../actions/postActions' 
import LinkPreview from '../post-assets/link_preview/LinkPreview'
import EmojiModal from '../../UI/modal/EmojiModal'
import LightBackdrop from '../../UI/backdrop/LightBackdrop'
import EmojiIcon from '../../UI/emoji-icon/EmojiIcon'
import PostSubmitIcon from '../../UI/post_submit_icon/PostSubmitIcon'
import PhotoIcon from '../../UI/photo_icon/PhotoIcon'

// import Embed from '../slate/embed/Embed'
import './PostForm.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class PostForm extends Component {
  state = {
    text: '',
    tags: [],
    showTags: false,
    tag1: '',
    tag2: '',
    tag3: '',
    tag4: '',
    errors: {},
    rows: 2,
    minRows: 2,
    maxRows: 3,
    show: false,
    data: {},
    showPreview: false,
    uploadedFileCloudinaryUrl: '',
    uploadedFile: '',
    media: '',
    showEmojis: false,
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
    const { avatar } = this.props.profile.profile
    e.preventDefault()
    const { user } = this.props.auth 
    this.setState({ showPreview: false })

    const newPost = {
      text: this.state.text,
      tags: this.state.tags,
      name: user.name,
      avatar,
      image: this.state.data.image,
      title: this.state.data.title,
      description: this.state.data.description,
      url: this.state.data.url,
      media: this.state.media,
      handle: this.props.profile.profile.handle
    }
    this.props.addPost(newPost) 
    this.setState({ text: '', data: {}, media: '', tag1: '', tag2: '', tag3: '', tag4: '' })
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

  toggleEmoji = () => {
    this.setState(prevState => ({ showEmojis: !prevState.showEmojis }))
  }

  addEmoji = emojiName => {
    const jsemoji = new JSEMOJI() 
    jsemoji.img_set = 'emojione' 
    jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/'
    jsemoji.supports_css = false 
    jsemoji.allow_native = false  
    jsemoji.replace_mode = 'unified' 
    jsemoji.text_mode = true 
    jsemoji.include_title = true 
    jsemoji.replace_unified(`:${emojiName}:`)
    jsemoji.replace_colons(`:${emojiName}:`)
    
    let emoji = String.fromCodePoint(parseInt(emojiName, 16))
    this.setState({ text: this.state.text + emoji })
  }

  toggleShowTags = () => this.setState(prevState => ({ showTags: !prevState.showTags }))

  onTagSubmit = e => {
    e.preventDefault()
    const arr = []
    if(this.state.tag1) arr.push(this.state.tag1)
    if(this.state.tag2) arr.push(this.state.tag2)
    if(this.state.tag3) arr.push(this.state.tag3)
    if(this.state.tag4) arr.push(this.state.tag4)

    this.setState({ tags: arr })
    this.toggleShowTags()
  }
  
  render() {
    const { errors, data, text, showPreview, media, rows, show, showEmojis } = this.state 
    return (
      <div className='post-feed-form'>
        <div>
          <LightBackdrop clicked={this.toggleEmoji} show={showEmojis} />
          <div className='post_form'>
            { showEmojis &&
              <EmojiModal>
                <EmojiPicker onEmojiClick={this.addEmoji} />
              </EmojiModal>
            }
            { this.state.showTags ?
              <EmojiModal>
                <form onSubmit={this.onTagSubmit}>
                  <p style={{ textAlign: 'center' }}><span role='img' aria-label='fire emoji'>🔥</span> hashtags yonder</p>
                  <input type="text" onChange={this.onChange} name='tag1' value={this.state.tag1} />
                  <input type="text" onChange={this.onChange} name='tag2' value={this.state.tag2} />
                  <input type="text" onChange={this.onChange} name='tag3' value={this.state.tag3} />
                  <input type="text" onChange={this.onChange} name='tag4' value={this.state.tag4} />
                  <button>ok</button>
                </form>
              </EmojiModal> : null
            }
            <div>
              <form onSubmit={this.onSubmit} onClick={this.showButtonsHandler} >
                <TextAreaForm
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
                  <i className="fas fa-hashtag" onClick={this.toggleShowTags} style={{cursor: 'pointer', color: 'var(--secondary-color)'}}></i>
                  <Dropzone 
                    style={{ border: 'none' }}
                    multiple={false}
                    accept='image/*, video/*'
                    onDrop={this.onImageDrop}>
                    <button style={{ background: 'none', border: 'none', outline: 'none' }} onClick={this.addPhoto}>
                      <PhotoIcon />
                    </button>
                  </Dropzone>
                  <EmojiIcon toggleEmoji={this.toggleEmoji} />
                  <button className='post_submit_button' title='Submit'>
                    <PostSubmitIcon />
                  </button>
                </div>
                { showPreview ? <LinkPreview post={data} media={media} /> : null }
              </form>
            </div>
          </div>
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
  auth: state.auth,
  profile: state.profile 
})

export default connect(mapStateToProps, { addPost })(PostForm)