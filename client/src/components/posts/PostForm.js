import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import TextAreaFieldGroup from '../common/TextAreaFieldGroup' 
import { addPost } from '../../actions/postActions' 
import axios from 'axios'
import LinkPreview from './LinkPreview'
// import Embed from '../slate/embed/Embed'
// import classnames from 'classnames'
import './PostForm.css'

class PostForm extends Component {
  state = {
    text: '',
    errors: {},
    rows: 2,
    minRows: 2,
    maxRows: 10,
    show: false,
    data: {},
    showPreview: false
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
      url: this.state.data.url 
    }

    this.props.addPost(newPost) 
    this.setState({ text: '' })
    this.setState({ data: {} })   // Clear newPost 
    e.target.reset() 
  }

  showButtonsHandler = () => {
    this.setState(prevState => ({ show: !prevState.show }))
  }

  addPhoto = (e) => {
    e.preventDefault()
    // share a photo or video for posts
    // Select a file
    // Check if file is image or video
    // Handle each case

    alert('Hello World!')
  }
  
  render() {
    const { errors, data } = this.state 
    return (
      <div className='post_form'>
        {/* <Embed /> */}
        <div id='post-form-textareafieldgroup'>
          <form onSubmit={this.onSubmit} onClick={this.showButtonsHandler} >
            <TextAreaFieldGroup
              className='text-area'
              placeholder="What's the discussion?"
              name='text'
              value={this.state.text} 
              onChange={this.onChange} 
              onPaste={this.onPaste}
              error={errors.text} 
              rows={this.state.rows}
            />
            <div className={ this.state.show ? 'otherstuff' : 'disp'}>
              <button style={{ background: 'none', border: 'none', outline: 'none' }} onClick={this.addPhoto}>
                <i className="fas fa-image" id='add-photo' />
              </button>
              <button className='post_submit_button' title='Submit'>
                <i id='post-submit-icon' className="far fa-paper-plane " />
              </button>
            </div>
            { this.state.showPreview ? <LinkPreview post={data} /> : null }
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
