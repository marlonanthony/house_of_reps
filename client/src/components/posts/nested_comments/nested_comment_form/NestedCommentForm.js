import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EmojiPicker from 'emoji-picker-react' 
import JSEMOJI from 'emoji-js'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import request from 'superagent'

import Icon from '../../../UI/icons/Icon'
import './NestedCommentForm.css'
import TextAreaForm from '../../../common/textarea/TextAreaForm'
import LightBackdrop from '../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../UI/modal/EmojiModal'
import { addNestedComment } from '../../../../actions/postActions'
import LinkPreview from '../../post-assets/link_preview/LinkPreview'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class NestedCommentForm extends Component {
  state = {
    errors: {},
    showEmojis: false,
    text: '',

    data: {},
    showPreview: false,
    uploadedFileCloudinaryUrl: '',
    uploadedFile: '',
    media: '',
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
      .then(res => this.setState({ data: res.data }, () => (console.log(this.state.data))))
      .then(this.setState((prevState) => ({ showPreview: !prevState.showPreview })))
      .catch(err => console.log(err)) 
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
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

  addNewNestedComment = (postId, commentId) => {
    const { user } = this.props.auth
    this.setState({ showPreview: false })

    const newNestedComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      handle: user.handle,
      image: this.state.data.image,
      title: this.state.data.title,
      description: this.state.data.description,
      url: this.state.data.url,
      media: this.state.media
    }
    this.props.addNestedComment(postId, commentId, newNestedComment)
    this.setState({ text: '', data: {}, media: '' })
    // e.target.reset()
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

  render() {
    const {
      showForm,
      showNestedSubmitBtnHandler,
      postId,
      comment,
      showNestedSubmitBtn
    } = this.props

    const { 
      errors, 
      showEmojis, 
      text,
      data,
      media,
      showPreview 
    } = this.state

    return showForm && (
      <>
        <LightBackdrop clicked={this.toggleEmoji} show={showEmojis} />
        { showEmojis &&
          <EmojiModal>
            <EmojiPicker onEmojiClick={this.addEmoji} />
          </EmojiModal>
        }
        <div className='nested_comment_form' onClick={showNestedSubmitBtnHandler}>
          <TextAreaForm 
            placeholder="Reply to comment" 
            name='text'
            value={text} 
            onChange={this.onChange}
            onPaste={this.onPaste}
            autoFocus
            error={errors.text}
          />
          { showNestedSubmitBtn && 
            <div className='nested_comments_form_buttons'>
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
              <Icon 
                icon='far fa-paper-plane' 
                title='submit' 
                toggleIcon={() => this.addNewNestedComment(postId, comment._id)} />
            </div>
          }
          <LinkPreview showPreview={showPreview} post={data} media={media} />
        </div>
      </>
    )
  }
}

NestedCommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  showForm: PropTypes.bool.isRequired,
  showNestedSubmitBtnHandler: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  showNestedSubmitBtn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { addNestedComment })(NestedCommentForm)