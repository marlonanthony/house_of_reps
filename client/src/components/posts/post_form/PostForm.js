import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react'
import Dropzone from 'react-dropzone'
import request from 'superagent'

import TextAreaForm from '../../common/textarea/TextAreaForm'
import { addPost } from '../../../actions/postActions'
import LinkPreview from '../post-assets/link_preview/LinkPreview'
import EmojiModal from '../../UI/modal/emoji-modal/EmojiModal'
import LightBackdrop from '../../UI/backdrop/LightBackdrop'
import Icon from '../../UI/icons/Icon'
import PostTag from '../post-assets/post_tag/PostTag'
import MentionsPopUp from './mentions_popup/MentionsPopup'
import './PostForm.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class PostForm extends Component {
  state = {
    text: '',
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
    showTags: false,
    tag: '',
    matchedMentions: []
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.setState({ data: this.state.data })
    }
  }

  onChange = e => {
    const textareaLineHeight = 24
    const { minRows, maxRows } = this.state
    const { profile } = this.props

    const previousRows = e.target.rows
    e.target.rows = minRows // reset number of rows in textarea

    const currentRows = e.target.scrollHeight / textareaLineHeight

    if (currentRows === previousRows) {
      e.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows
      e.target.scrollTop = e.target.scrollHeight
    }

    this.setState({
      [e.target.name]: e.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    })

    // match mentions
    console.log(profile.profiles[0])
    let foundMatch = e.target.value.match(/@\w+$/i)
    if (foundMatch) {
      let foundHandle = foundMatch[0].slice(1)
      // limit profiles returned to 5 by creating arr
      let arr = []
      profile &&
        profile.profiles &&
        profile.profiles.forEach(person => {
          if ((
            person.handle.startsWith(foundHandle) ||
            (person.name && person.name.toLowerCase().startsWith(foundHandle)) || 
            (person.stageName && person.stageName.toLowerCase().startsWith(foundHandle))
            )
            && arr.length < 5) {
            arr.push(person.handle)
            this.setState({ matchedMentions: arr })
          }
        })
    }
    if (!foundMatch) this.setState({ matchedMentions: [] })
  }

  onPaste = e => {
    e.stopPropagation()
    let clipboardData = e.clipboardData || window.clipboardData
    let pastedData = clipboardData.getData('Text')
    // Check for URL
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
    if (!regex.test(pastedData)) {
      return
    } else {
      axios
        .get(
          `https://api.linkpreview.net/?key=5beb6c4718c9c4851e9a2a49e54a3adc2dcbacd64fffc&q=${pastedData}`
        )
        .then(res => this.setState({ data: res.data }))
        .then(
          this.setState(prevState => ({ showPreview: !prevState.showPreview }))
        )
        .catch(err => console.log(err))
    }
  }

  onSubmit = e => {
    e.preventDefault()
    if (!this.state.tag) {
      alert('Choose a tag for your post!')
      return
    }
    const { user } = this.props.auth
    this.setState({ showPreview: false })

    const newPost = {
      text: this.state.text,
      tag: this.state.tag,
      name: user.name,
      avatar: user.avatar,
      image: this.state.data.image,
      title: this.state.data.title,
      description: this.state.data.description,
      url: this.state.data.url,
      media: this.state.media,
      handle: this.props.profile.profile.handle
    }
    this.props.addPost(newPost)
    this.setState({ text: '' })
    e.target.reset()
  }

  showButtonsHandler = () => {
    this.setState(prevState => ({ show: !prevState.show, errors: {} }))
  }

  onImageDrop = files => {
    this.setState({ uploadedFile: files[0] })
    this.handleImageUpload(files[0])
  }

  handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (err) console.log(err)
      if (response.body.secure_url !== '') {
        this.setState({ uploadedFileCloudinaryUrl: response.body.secure_url })
        this.setState({ media: response.body.secure_url })
        this.setState({ showPreview: true })
      }
    })
  }

  toggleEmoji = () => {
    this.setState(prevState => ({ showEmojis: !prevState.showEmojis }))
  }

  addEmoji = (e, emojiObject) => {
    this.setState({ text: this.state.text + emojiObject.emoji })
  }

  setShowTag = () => {
    this.setState(prevState => ({ showTags: !prevState.showTags }))
  }
  setTag = e => {
    this.setState({ tag: e.target.value, showTags: false })
  }

  mentionsPopupHandler = person => {
    const { text } = this.state
    this.setState({
      text: text.replace(text.match(/@\w+$/i), `@${person}`),
      matchedMentions: []
    })
  }

  render() {
    const {
      errors,
      data,
      text,
      showPreview,
      media,
      rows,
      show,
      showEmojis,
      matchedMentions
    } = this.state
    return (
      <section className="post-feed-form">
        <div>
          <LightBackdrop clicked={this.toggleEmoji} show={showEmojis} />
          <div className="post_form">
            {showEmojis && (
              <EmojiModal>
                <EmojiPicker onEmojiClick={this.addEmoji} />
              </EmojiModal>
            )}
            <div>
              <form onSubmit={this.onSubmit}>
                <TextAreaForm
                  className="text-area"
                  placeholder="What's the discussion?"
                  name="text"
                  value={text}
                  onChange={this.onChange}
                  onPaste={this.onPaste}
                  error={errors.text}
                  rows={rows}
                  noFocus
                  onClick={this.showButtonsHandler}
                />
                <MentionsPopUp
                  mentionsPopupHandler={this.mentionsPopupHandler}
                  matchedMentions={matchedMentions}
                />
                <div className={show ? 'otherstuff' : 'disp'}>
                  <Dropzone
                    style={{ border: 'none' }}
                    multiple={false}
                    accept="image/*, video/*"
                    onDrop={this.onImageDrop}
                  >
                    <button
                      className="comment_form_btns"
                      onClick={this.addPhoto}
                    >
                      <Icon icon="fas fa-image" title="upload photo" />
                    </button>
                  </Dropzone>
                  <Icon
                    icon="far fa-smile-wink"
                    title="emojis"
                    toggleIcon={this.toggleEmoji}
                  />
                  <Icon
                    icon="fas fa-hashtag"
                    title="add tag"
                    toggleIcon={this.setShowTag}
                  />
                  <button className="post_submit_button">
                    <Icon icon="far fa-paper-plane" title="submit" />
                  </button>
                </div>
                <PostTag
                  tag={this.state.tag}
                  onChange={this.setTag}
                  showTags={this.state.showTags}
                  errors={this.state.errors}
                />
                <LinkPreview
                  post={data}
                  media={media}
                  showPreview={showPreview}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
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

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm)
