import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import axios from 'axios'
import Dropzone from 'react-dropzone' 
import request from 'superagent' 
import EmojiPicker from 'emoji-picker-react' 
import JSEMOJI from 'emoji-js'

import TextAreaForm from '../../../common/textarea/TextAreaForm' 
import { addComment } from '../../../../actions/postActions'
import LinkPreview from '../../post-assets/link_preview/LinkPreview'
import EmojiModal from '../../../UI/modal/EmojiModal'
import LightBackdrop from '../../../UI/backdrop/LightBackdrop'
import Icon from '../../../UI/icons/Icon'
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
    media: '',
    showEmojis: false 
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
    let clipboardData = e.clipboardData || window.clipboardData,
        pastedData = clipboardData.getData('Text') 

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
      handle: user.handle,
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
    this.setState(prevState => ({ show: !prevState.show, errors: {} }))
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
        this.setState({ 
          uploadedFileCloudinaryUrl: response.body.secure_url,
          media: response.body.secure_url,
          showPreview: true
        })
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

  render() {
    const { 
      errors, 
      data, 
      media, 
      show, 
      showPreview, 
      text, 
      showEmojis 
    } = this.state 
    return (
      <>
        <LightBackdrop clicked={this.toggleEmoji} show={showEmojis} />
        <div className="post-form ">
          { showEmojis &&
            <EmojiModal>
              <EmojiPicker onEmojiClick={this.addEmoji} />
            </EmojiModal>
          }
          <div onClick={this.showButtonsHandler}>
            <form onSubmit={this.onSubmit}>
              <TextAreaForm
                placeholder="Reply to post"
                name='text'
                value={text}
                onChange={this.onChange}
                onPaste={this.onPaste}
                error={errors.text}
                autoFocus
              />
              <div className={ show ? 'otherstuff' : 'disp' }>
                <Dropzone 
                  style={{ border: 'none' }}
                  multiple={false}
                  accept='image/*, video/*'
                  onDrop={this.onImageDrop}>
                  <button className='comment_form_btns' onClick={this.addPhoto}>
                    <Icon icon='fas fa-image' title='upload photo' />
                  </button>
                </Dropzone>
                <Icon icon='far fa-smile-wink' title='emojis' toggleIcon={this.toggleEmoji} />
                <button type='submit' className='comment_form_btns'>
                  <Icon icon='far fa-paper-plane' title='submit' />
                </button>
              </div>
              <LinkPreview showPreview={showPreview} post={data} media={media} />
            </form>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, { addComment })(CommentForm)
